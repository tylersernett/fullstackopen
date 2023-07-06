const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs have id identifier', async () => {
  const response = await api
    .get('/api/blogs')
  const blogs = response.body
  expect(blogs[0].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})