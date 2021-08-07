const express = require('express')
const Route = express.Router()
const usersRouter = require('../modules/users/users_routes')
const productRouter = require('../modules/product/product_routes')
const cartRouter = require('../modules/cart/cart_routes')

Route.use('/user', usersRouter)
Route.use('/product', productRouter)
Route.use('/cart', cartRouter)

module.exports = Route
