const express = require('express')
const Route = express.Router()
const { authentication } = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getProductDetails
} = require('./product_controller')

Route.post('/add', authentication, uploadFile, addProduct)
Route.patch('/update/:id', authentication, uploadFile, updateProduct)
Route.delete('/delete/:id', authentication, deleteProduct)
Route.get('/', authentication, getAllProduct)
Route.get('/details/:id', authentication, getProductDetails)

module.exports = Route
