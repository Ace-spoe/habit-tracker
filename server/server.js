const dns = require('node:dns')
dns.setServers(['1.1.1.1', '8.8.8.8'])

require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const connectDB = require('./database/db')
const cors = require('cors')


const authRouter = require('./routes/auth-router')
const userRouter = require('./routes/user-router')
const habitRouter = require('./routes/habit-router')

const errorHandler = require('./middleware/error-handler')

const app = express()
 
connectDB()

// 2. CORS — must come before routes, and needs credentials:true for cookies to work cross-origin
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res) => {
  res.send('Welcome to the Habit tracker ')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/habits', habitRouter)



app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})

