const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength : 2,
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  },
  completedDates: {
    type: [Date],
    default: []
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'HabitUser',
    required : true
  }
} ,{timestamps : true})


module.exports = mongoose.model('Habit', habitSchema)