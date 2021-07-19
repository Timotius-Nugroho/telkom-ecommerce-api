const helper = require('../../helpers/wrapper')
const { getAllData, getPrizeName, updateData } = require('./admin_model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  login: async (req, res) => {
    try {
      const { password } = req.body
      if (process.env.ADMIN_PASS !== password) {
        return helper.response(res, 400, 'Wrong Password')
      }

      const token = jwt.sign({ role: 'admin' }, process.env.PRIVATE_KEY, {
        expiresIn: '24h'
      })
      return helper.response(res, 200, 'Succes login', token)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getAllUserData: async (req, res) => {
    try {
      const result = await getAllData()
      for (const user of result) {
        user.prize = await getPrizeName(user.id)
      }
      return helper.response(res, 200, 'Succes get all user data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateStatusSubmission: async (req, res) => {
    try {
      const { id } = req.params
      const setData = req.body
      setData.updated_at = new Date(Date.now())
      const result = await updateData(setData, id)
      return helper.response(
        res,
        200,
        'Succes Update Submission Status',
        result
      )
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
