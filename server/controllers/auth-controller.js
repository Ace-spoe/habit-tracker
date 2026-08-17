const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const HabitUser = require('../models/User')


 const register = async  (req , res , next) => {
    try {
        if(!req.body){
        return res.status(400).json({
            success : false ,
            message : "Enter body"
        })
    }

    const {username , email , password , role} = req.body

    if(!(username && email && password)){
        return res.status(400).json({
            success : false ,
            message : "Important credentials missing"
        })
    }

    const checkUserExisits = await HabitUser.findOne({
        $or : [{username} ,{email}]
    })

    if(checkUserExisits){
        return res.status(400).json({
            success : false ,
            message : "User with such data exists"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = await HabitUser.create({
        username , email , 
        password : hashedPassword,
        role : role || 'user'
    })



    res.status(201).json({
        success : true,
        message : 'Registered Successfully!',
        userId : newUser._id
    })


    }catch(err){
        next(err)
    }
}

const login = async (req , res, next) => {
    try{
         if(!req.body){
        return res.status(400).json({
            success : false ,
            message : "Enter body"
        })
        }

    const { email , password } = req.body

    if(!(email && password)){
        return res.status(400).json({
            success : false ,
            message : "Important credentials missing"
        })
    }

    const user = await HabitUser.findOne({email})

    if(!user){
        return res.status(401).json({
            success : false ,
            message : "Invalid Email or password"
        })
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch){
        return res.status(401).json({
            success : false ,
            message : "Invalid Email or password"
        })
    }

    const accessToken = jwt.sign(
        {
            userId : user._id,
            email : user.email,
            role : user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '1d'
        }
    )

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,        // true in production
      sameSite : 'none',
      maxAge: 1000 * 60 * 60 * 24
    });

    res.json({
        success : true, 
        message : "logged in successfully",
        userData : {
            ID : user._id,
            username : user.username,
            email : user.email,
            role : user.role
        }
    })


    }catch(err){
        next(err)
    }
}

const logout = (req, res, next) => {
  try {
    res.clearCookie('token')
    res.json({
      success: true,
      message: 'Logged out successfully'
    })
  } catch (err) {
    next(err)
  }
}

const getMe = async (req, res, next) => {
  try {
    const user = await HabitUser.findById(req.userInfo.userId).select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    res.json({ success: true, userData: user })
  } catch (err) {
    next(err)
  }
}



module.exports = {
    register ,
    login ,
    logout ,
    getMe
} 