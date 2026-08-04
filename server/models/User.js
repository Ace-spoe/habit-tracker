const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true 
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true 
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    profilePicture : {
      url : { type : String },
      public_id : { type : String }
    }

},{timestamps : true})

module.exports = mongoose.model('HabitUser' , userSchema)