require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

//define routes AFTER the body parser or request.body is undefined
const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs', blogsRouter)

const usersRouter = require('./controllers/users')
app.use('./api/users', usersRouter)

module.exports = app