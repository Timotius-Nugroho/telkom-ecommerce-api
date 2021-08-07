const helper = require('../../helpers/wrapper')
const deleteImage = require('../../helpers/deleteImage')
const {
  addData,
  deleteData,
  checkDataByCondition,
  updateData,
  getAlllData,
  getDataCount,
  getUserInfo
} = require('./product_model')

module.exports = {
  addProduct: async (req, res) => {
    try {
      const id = req.decodeToken.id
      req.body.user_id = id
      req.body.product_image = req.file ? req.file.filename : ''

      const result = await addData(req.body)
      return helper.response(res, 200, 'Succes input new product', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const isProductExist = await checkDataByCondition({ product_id: id })
      if (isProductExist.length === 0) {
        return helper.response(res, 404, 'Product not found')
      }

      if (isProductExist[0].product_image) {
        const imgLoc = `src/uploads/${isProductExist[0].product_image}`
        deleteImage(imgLoc)
      }

      const result = await deleteData(id)
      return helper.response(res, 200, 'Succes delete product', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateProduct: async (req, res) => {
    try {
      // console.log(req.body, req.params)
      const { id } = req.params
      const isProductExist = await checkDataByCondition({ product_id: id })
      if (isProductExist.length === 0) {
        return helper.response(res, 404, 'Product not found')
      }
      req.body.product_updated_at = new Date(Date.now())

      if (req.file) {
        req.body.product_image = req.file.filename
        if (isProductExist[0].product_image) {
          const imgLoc = `src/uploads/${isProductExist[0].product_image}`
          deleteImage(imgLoc)
        }
      }

      const result = await updateData(id, req.body)
      return helper.response(res, 200, 'Succes update data !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllProduct: async (req, res) => {
    try {
      let { page, limit, sort, keywords } = req.query

      limit = limit || '5'
      page = page || '1'
      keywords = keywords ? '%' + keywords + '%' : '%'
      sort = sort ? 'product_price ' + sort : 'product_price ASC'

      page = parseInt(page)
      limit = parseInt(limit)
      const offset = page * limit - limit

      const totalData = await getDataCount(keywords)
      console.log('Total Data ' + totalData)
      const totalPage = Math.ceil(totalData / limit)
      console.log('Total Page ' + totalPage)
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const result = await getAlllData(limit, offset, keywords, sort)
      for (const item of result) {
        const sellerInfo = await getUserInfo({ user_id: item.user_id })
        item.product_location = sellerInfo[0].user_city
      }

      return helper.response(
        res,
        200,
        'Succes get all product',
        result,
        pageInfo
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getProductDetails: async (req, res) => {
    try {
      const { id } = req.params
      const result = await checkDataByCondition({ product_id: id })
      if (result.length === 0) {
        return helper.response(res, 404, 'Product not found')
      }

      const sellerInfo = await getUserInfo({ user_id: result[0].user_id })
      result[0].product_location = sellerInfo[0].user_city

      return helper.response(res, 200, 'Succes get product details', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
