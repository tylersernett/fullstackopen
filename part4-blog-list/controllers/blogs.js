const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required fields' });
  }

  //only userId is sent in request. 
  blog.user = user.id;
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const foundBlog = await Blog.findById(id);
  response.status(200).json(foundBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  console.log(decodedToken)
  const userId = decodedToken.id;

  const blog = await Blog.findById(id);

  console.log('u:', blog.user.toString(), " ... uid: ", userId)
  if (blog.user.toString() !== userId) {
    return response.status(403).json({ error: 'Unauthorized' });
  }

  const deletedBlog = await Blog.findByIdAndDelete(id);
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter