const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required fields' });
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id;

  const foundBlog = await Blog.findById(id);
  response.status(200).json(foundBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  const deletedBlog = await Blog.findByIdAndDelete(id);
  response.status(204).end()
})

module.exports = blogsRouter