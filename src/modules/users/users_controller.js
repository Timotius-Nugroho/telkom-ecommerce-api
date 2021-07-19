const helper = require('../../helpers/wrapper')
const {
  addData,
  addPrize,
  checkByCondition,
  getUserInfo
} = require('./users_model')

module.exports = {
  inputFrom: async (req, res) => {
    try {
      const dataUser = req.body
      const isUserExist = await checkByCondition({ id: dataUser.id })
      const userInfo = await getUserInfo(dataUser.id)

      if (userInfo.status === 'error') {
        return helper.response(res, 404, 'User not found')
      }
      if (isUserExist) {
        return helper.response(res, 403, 'The user has entered data')
      }
      for (const field in dataUser) {
        if (!dataUser[field]) {
          return helper.response(res, 400, 'Incomplete form')
        }
      }

      if (userInfo.packages.length > 0) {
        let prizeName = ''
        for (const pack of userInfo.packages) {
          if (pack.packageTag === 'englishacademy') {
            prizeName = 'Shoes'
          } else if (pack.packageTag === 'skillacademy') {
            prizeName = 'Bag'
          } else if (pack.packageTag === 'ruangguru') {
            prizeName = 'Pencils'
          } else {
            prizeName = 'Undefined'
          }
          await addPrize({ name: prizeName, user_id: dataUser.id })
        }
      }
      const result = await addData(dataUser)
      return helper.response(res, 200, 'Succes input user data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
