require('dotenv').config()
const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('express-async-errors')

const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const cors = require('cors')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

//define routes AFTER the body parser or request.body is undefined
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)
const usersRouter = require('./controllers/users')
app.use('/api/users', usersRouter)
const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app