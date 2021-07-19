const express = require('express')
const Route = express.Router()
const usersRouter = require('../modules/users/users_routes')
const adminRouter = require('../modules/admin/admin_routes')

Route.use('/user', usersRouter)
Route.use('/admin', adminRouter)

module.exports = Route
