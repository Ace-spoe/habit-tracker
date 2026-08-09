const express = require('express')
const authmiddleware = require('../middleware/auth-middleware')
const { getHabits,postHabit,deleteHabit,changeHabit,modifyHabit
} = require('../controllers/habit-controller')

const habitRouter = express.Router()

habitRouter.get('/', authmiddleware, getHabits)
// habitRouter.get('/:id', authmiddleware, getHabitById)
habitRouter.post('/', authmiddleware, postHabit)
habitRouter.delete('/:id', authmiddleware, deleteHabit)
habitRouter.put('/:id', authmiddleware, changeHabit)
habitRouter.patch('/:id/complete', authmiddleware, modifyHabit)

module.exports = habitRouter