const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs;
const blogsInDb = helper.blogsInDb;

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
})

describe('when initial blogs are saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blogs have id identifier', async () => {
    const response = await api
      .get('/api/blogs')
    const blogs = response.body
    expect(blogs[0].id).toBeDefined()
  })
})

describe('creating new blog', () => {
  test('succeeds with status 201 if data is valid', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://www.exampleblog.com/1',
      likes: 13,
    };

    // Make a POST request to create a new blog post
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // Verify that the total number of blogs is increased by one
    const blogsAfterCreation = await api.get('/api/blogs');
    expect(blogsAfterCreation.body.length).toBe(initialBlogs.length + 1);

    // Verify that the content of the blog post is saved correctly
    const createdBlog = blogsAfterCreation.body.find(
      (blog) => blog.id === response.body.id
    );
    expect(createdBlog.title).toBe(newBlog.title);
    expect(createdBlog.author).toBe(newBlog.author);
    expect(createdBlog.url).toBe(newBlog.url);
    expect(createdBlog.likes).toBe(newBlog.likes);
  });

  test('has likes default to 0 if likes field is not provided', async () => {
    const newBlog = {
      title: 'Test Blog No Like',
      author: 'Test Author No Like',
      url: 'http://www.examplenolike.com/1',
    };

    // Make a POST request to create a new blog post
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    // Verify that the total number of blogs is increased by one
    const blogsAfterCreation = await api.get('/api/blogs');
    expect(blogsAfterCreation.body.length).toBe(initialBlogs.length + 1);

    // Verify that the content of the blog post is saved correctly
    const createdBlog = blogsAfterCreation.body.find(
      (blog) => blog.id === response.body.id
    );
    expect(createdBlog.title).toBe(newBlog.title);
    expect(createdBlog.author).toBe(newBlog.author);
    expect(createdBlog.url).toBe(newBlog.url);
    expect(createdBlog.likes).toBe(0);
  });

  test('fails with status 400 Bad Request if title is missing', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'http://www.exampleblog.com/1',
      likes: 13,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });

  test('fails with status 400 Bad Request if URL is missing', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      likes: 13,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
})

describe('deleting a blog', () => {
  test('succeeds with status 204 if ID is valid', async () => {
    const blogsBeforeDeletion = await blogsInDb();

    // Choose an existing blog ID to delete
    const blogToDelete = blogsBeforeDeletion[0];
    const blogId = blogToDelete.id;

    // Make a DELETE request to delete the blog
    await api
      .delete(`/api/blogs/${blogId}`)
      .expect(204);

    const blogsAfterDeletion = await blogsInDb();

    // Verify that the total number of blogs is decreased by one
    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1);

    // Verify that the deleted blog is no longer present
    const deletedBlog = blogsAfterDeletion.find(blog => blog.id === blogId);
    expect(deletedBlog).toBeUndefined();
  });
})

describe('updating a blog', () => {
  test('succeeds with status 200 if ID is valid', async () => {
    const blogsBeforeUpdate = await blogsInDb();

    // Choose an existing blog ID to update
    const blogToUpdate = blogsBeforeUpdate[0];
    const blogId = blogToUpdate.id;

    const updatedBlogData = {
      author: 'Updated Author',
      title: 'Updated Title',
      url: 'http://www.example.com/updated',
      likes: 100
    };

    // Make a PUT request to update the blog
    await api
      .put(`/api/blogs/${blogId}`)
      .send(updatedBlogData)
      .expect(200);

    const blogsAfterUpdate = await blogsInDb();

    // Find the updated blog
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogId);

    // Verify that the blog has been updated with the new data
    expect(updatedBlog.author).toBe(updatedBlogData.author);
    expect(updatedBlog.title).toBe(updatedBlogData.title);
    expect(updatedBlog.url).toBe(updatedBlogData.url);
    expect(updatedBlog.likes).toBe(updatedBlogData.likes);
  });
})

afterAll(async () => {
  await mongoose.connection.close()
})