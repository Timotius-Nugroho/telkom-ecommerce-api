const express = require('express')
const Route = express.Router()
const { addItem, reduceItem, getAllItem } = require('./cart_controller')
const { authentication } = require('../../middleware/auth')

Route.post('/add', authentication, addItem)
Route.get('/reduce', authentication, reduceItem)
Route.get('/all-item', authentication, getAllItem)

module.exports = Route
