const express = require('express')
const Route = express.Router()
const {
  login,
  getAllUserData,
  updateStatusSubmission
} = require('./admin_controller')
const { authentication } = require('../../middleware/auth')

Route.post('/login', login)
Route.get('/user-data', authentication, getAllUserData)
Route.patch('/update-status/:id', authentication, updateStatusSubmission)

module.exports = Route
