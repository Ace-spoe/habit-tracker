const express = require('express')
const { register , login , logout , getMe} = require('../controllers/auth-controller')
const authmiddleware = require('../middleware/auth-middleware')

const authRouter = express.Router()

authRouter.post('/register' , register)
authRouter.post('/login' , login)
authRouter.post('/logout' , authmiddleware , logout)
authRouter.get('/me', authmiddleware, getMe)

module.exports = authRouter