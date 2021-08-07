const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization

    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.PRIVATE_KEY, (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          req.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please login !')
    }
  }
}
