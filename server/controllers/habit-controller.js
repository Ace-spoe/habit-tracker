
const Habit = require('../models/Habit')

const getHabits = async (req,res,next) => {

  try{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit
    const sortBy = req.query.sortBy || 'createdAt'
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1
  
   
     const { userId } = req.userInfo
     const filter = { userId }
     if(req.query.search){
      filter.name = {
        $regex : req.query.search , 
        $options : 'i'
      }
     }
     if(req.query.frequency){
      filter.frequency = req.query.frequency
     }

    const habits = await Habit.find(filter)
    .sort({[sortBy] : sortOrder})
    .skip(skip)
    .limit(limit)
    

    if(habits.length === 0){
      return res.json({ message: 'No habits Found' , data : [] })
    }

    const totalCount = await Habit.countDocuments(filter)

  
    res.json({
      message: 'Filtered habits',
      data: habits,
      pagination : {
        currentPage : page ,
        totalPages : Math.ceil(totalCount / limit) ,
        totalItems : totalCount
      }
    })



  } catch(error){
    next(error)
  }
}

const getHabitById = async (req,res,next) => {

  try{ 
    const habitByID = await Habit.findOne({
      _id : req.params.id ,
      userId : req.userInfo.userId
    })

    if(!habitByID){
      return res.status(404).json({
        message : 'Habit not found'
      })
    }
    res.json({
      message : 'Habit Found',
      data : habitByID
    })
  }catch(error){
    next(error)
  }

}

const postHabit =  async (req,res,next) => {

  if(!req.body.name || !req.body.frequency){
    return res.status(400).json({ 
      message : 'Please insert the appropriate fields'
    })
  }

  try{
    const { name , frequency } = req.body
    const { userId } = req.userInfo
    const newHabit = await Habit.create({ name,frequency, userId })

    res.status(201).json({
      message : 'Created new Habit successfully!',
      data : newHabit
    })
  }catch(error){
    next(error)
  }

}

const deleteHabit = async (req,res,next) => {

  try {
    const deletedHabit = await Habit.findOneAndDelete({
      _id : req.params.id ,
      userId : req.userInfo.userId
    })
  // findByIdAndDelete only accepts an ID as its first argument, so it can't check ownership at the same time. Use findOneAndDelete instead, which accepts a full filter object.

    if(!deletedHabit){
      return res.status(404).json({
        message : 'Habit not found!'
      })
    }

   res.status(204).end()
    //res.status(204).end('Deleted Successfully!')
    // 204 responses to have no body at all so its better if we leave it without a response or use different status code

  }catch(error){
    next(error)
  }
}

const changeHabit = async(req,res,next) => {
  try{
    const { name , frequency } = req.body
    const updatedHabit = await Habit.findOneAndUpdate(
      {
      _id : req.params.id ,
      userId : req.userInfo.userId
      },
      { name, frequency },
      {
        new : true ,
        runValidators: true
      })

    if(!updatedHabit){
      return res.status(404).json({
        message : 'Habit not Found'
      })
    }

    res.json({
      message : 'updated succesfully',
      data : updatedHabit
    })
  }catch(error){
    next(error)
  }
}

const modifyHabit = async (req,res,next) => {
  try{
    const habitById = await Habit.findOne({
       _id: req.params.id, 
       userId: req.userInfo.userId 
    })

    
    if(!habitById){
      return res.status(404).json({
        message : 'Habit not found!',
      })
    }

    const today = new Date().toDateString()
    const completedDatesAlteredArray = habitById.completedDates.map(date => date.toDateString())
    
    if(completedDatesAlteredArray.includes(today)){
      return res.status(400).json({
        message : 'Already Registered'
      })
    }

    
    habitById.completedDates.push(new Date())
    habitById.streak += 1
    const updatedHabit = await habitById.save()
    res.json({
      message : 'Updated successfully!',
      data : updatedHabit
    })



  }catch(error){
    next(error)
  }
}

module.exports = {
    getHabits,
    getHabitById,
    postHabit,
    deleteHabit,
    changeHabit,
    modifyHabit
}