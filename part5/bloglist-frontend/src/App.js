import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const BlogForm = ({ newBlog, setNewBlog, addBlog }) => {

  const { title, url, author } = newBlog

  return (
    <form onSubmit={addBlog}>
      <h2>Create New Blog</h2>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
      </div>
      <div>
        URL:
        <input
          value={url}
          onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password, })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('creating newblog:', newBlog)
    try {
      await blogService.create(newBlog)
    } catch (exception) {
      setErrorMessage('Adding Blogpost Failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {user === null ?
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin} />
        :
        <>
          <p>{user.name} logged in</p>
          <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} addBlog={addBlog} />
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )

}

export default App