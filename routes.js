const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')

const { loginRequired } = require('./src/middlewares/middleware')

route.get('/', homeController.index)

//Routes Login
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)
route.get('/admin', loginController.admin)

//Routes Contacts
route.get('/contato', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/:id', loginRequired, contatoController.view)
route.post('/contato/edit/:id', loginRequired, contatoController.edit)
route.get('/contato/delete/:id', loginRequired, contatoController.delete)

module.exports = route;