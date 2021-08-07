const helper = require('../../helpers/wrapper')
const {
  checkData,
  addData,
  updateData,
  getDataById,
  deleteData,
  getAllData,
  getProductInfo
} = require('./cart_model')

module.exports = {
  addItem: async (req, res) => {
    try {
      // console.log(req.body)
      const id = req.decodeToken.id
      const productInfo = await getProductInfo({
        product_id: req.body.product_id
      })
      if (productInfo.length === 0) {
        return helper.response(res, 404, 'Product not found')
      }

      if (id === productInfo[0].user_id) {
        return helper.response(res, 403, 'cant add your own stuff')
      }

      let result
      const checkItem = await checkData(
        productInfo[0].user_id,
        req.body.product_id
      )
      if (checkItem) {
        await updateData(checkItem.cart_id, {
          cart_count: checkItem.cart_count + 1
        })
        result = { cart_count: checkItem.cart_count + 1 }
      } else {
        req.body.cart_count = 1
        req.body.user_id = productInfo[0].user_id
        result = await addData(req.body)
      }

      return helper.response(res, 200, 'Succes add item !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  reduceItem: async (req, res) => {
    try {
      // console.log(req.query)
      const checkItem = await getDataById(req.query.cart_id)
      if (!checkItem) {
        return helper.response(res, 404, 'item not found')
      }

      if (checkItem.cart_count === 1) {
        await deleteData(checkItem.cart_id)
      }
      await updateData(checkItem.cart_id, {
        cart_count: checkItem.cart_count - 1
      })

      const result = { cart_count: checkItem.cart_count - 1 }
      return helper.response(res, 200, 'Succes reduce item !', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllItem: async (req, res) => {
    try {
      // console.log(req.query)
      const result = await getAllData(req.query.user_id)

      for (const item of result) {
        item.product_info = await getProductInfo({
          product_id: item.product_id
        })
      }

      return helper.response(res, 200, 'Get all item in cart', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
