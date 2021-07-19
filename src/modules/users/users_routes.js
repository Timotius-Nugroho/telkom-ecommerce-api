const express = require('express')
const Route = express.Router()
const { inputFrom } = require('./users_controller')

Route.post('/', inputFrom)

module.exports = Route
