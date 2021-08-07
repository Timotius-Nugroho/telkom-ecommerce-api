const helper = require('../../helpers/wrapper')
const { getDataByCondition, addData } = require('./users_model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      // console.log(req.body)
      const isUserExist = await getDataByCondition({
        user_email: req.body.user_email
      })
      if (isUserExist.length > 0) {
        return helper.response(res, 400, 'Email Registered')
      }

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(req.body.user_password, salt)
      req.body.user_password = encryptPassword

      const result = await addData(req.body)
      delete result.user_password
      return helper.response(res, 200, 'Succes add new user', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  login: async (req, res) => {
    try {
      const isUserExist = await getDataByCondition({
        user_email: req.body.user_email
      })
      if (isUserExist.length === 0) {
        return helper.response(res, 404, 'User not found')
      }

      const checkPassword = bcrypt.compareSync(
        req.body.user_password,
        isUserExist[0].user_password
      )
      if (!checkPassword) {
        return helper.response(res, 400, 'Wrong password')
      }

      const token = jwt.sign(
        { id: isUserExist[0].user_id },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '24h'
        }
      )
      return helper.response(res, 200, 'Succes login', token)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
