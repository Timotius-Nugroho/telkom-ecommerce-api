const express = require('express')
const Route = express.Router()
const { login, register } = require('./users_controller')

Route.post('/register', register)
Route.post('/login', login)

module.exports = Route
