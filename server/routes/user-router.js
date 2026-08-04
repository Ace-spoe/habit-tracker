const express = require('express')
const { uploadProfilePicture , deleteProfilePicture , changePassword} =  require('../controllers/user-controller')
const authmiddleware = require('../middleware/auth-middleware')
const upload = require('../config/multer')


const userRouter = express.Router()



userRouter.post('/change-password', authmiddleware, changePassword)
userRouter.patch('/profile-picture' , authmiddleware , upload.single('profilePicture') , uploadProfilePicture )
userRouter.delete('/profile-picture' , authmiddleware , deleteProfilePicture )

module.exports = userRouter