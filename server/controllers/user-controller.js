const cloudinary = require('../config/cloudinary')
const fs = require('fs')
const HabitUser = require('../models/User')
const bcrypt = require('bcryptjs')


const changePassword = async (req , res , next) => { 
  try{ 

    const user = await HabitUser.findById(req.userInfo.userId)
    if(!user){
      return res.status(400).json({
        success : false ,
        message : 'User not found'
      })
    }
      const { oldpassword , newPassword } = req.body
      const isMatch = await bcrypt.compare(oldpassword , user.password)
      
      if(!isMatch){
        return res.status(400).json({
        success : false ,
        message : 'Old password is not correct'
      })
      }

      const salt = await bcrypt.genSalt(10)
      const newHashedPassword = await bcrypt.hash(newPassword , salt)

      user.password = newHashedPassword
      await user.save()

      res.json({
        success : true ,
        message : 'Password Changed succesfully'
      })


  }catch(err){
    next(err)
  }
}

const deleteProfilePicture = async (req ,res ,next) => {
  try{
    const user = await HabitUser.findOne({_id : req.userInfo.userId})

    if(!user){
      return res.status(404).json({
        success : false,
        message : ' User not found'
      })
    }
    const profilePicture = user.profilePicture.public_id
    if(!profilePicture){
      return res.status(400).json({
        success : false,
        message : `User doesn't have profile pricture` 
      })
    }

    await cloudinary.uploader.destroy(profilePicture)

    user.profilePicture.public_id = ''
    user.profilePicture.url = ''

    await user.save()

    res.json({
      success: true ,
      message : 'Profile picture deleted sucessfully'
    })
    
  }catch(err){
    next(err)
  }
}

const uploadProfilePicture = async (req , res , next) => {
  try{
    if(!req.file){
      return res.status(400).json({
        success : false,
        message : 'Choose a valid image from your file'
      })
    }
    const user = await HabitUser.findById(req.userInfo.userId)

    if(!user){
      return res.status(404).json({
        success : false,
        message : ' User not found'
      })
    }

    const oldProfilePicture = user.profilePicture.public_id

    if(oldProfilePicture){
      await cloudinary.uploader.destroy(oldProfilePicture)
    }
    
    const newProfilePicture = await cloudinary.uploader.upload(req.file.path)
    user.profilePicture.public_id = newProfilePicture.public_id
    user.profilePicture.url = newProfilePicture.secure_url

    await user.save()

    fs.unlinkSync(req.file.path)

    res.json({
      success: true ,
      message : 'Profile picture updated sucessfully',
      imageData : newProfilePicture
    })



  }catch(err){
    next(err)
  }
}


module.exports = {
    uploadProfilePicture ,
    deleteProfilePicture ,
    changePassword
}

