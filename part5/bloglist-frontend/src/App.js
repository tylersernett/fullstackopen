import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogform from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  let notificationTimeout = null;
  const showNotification = (text, type) => {
    clearTimeout(notificationTimeout);
    setNotification({ text, type });
    notificationTimeout = setTimeout(() => setNotification(null), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const createBlog = async (blogObj) => {
    try {
      await blogService.create(blogObj)
      setBlogs(blogs.concat(blogObj)) // Update the state with the new list of blogs
      showNotification(`Succesfully added "${blogObj.title}" by ${blogObj.author}`, 'success')
    } catch (exception) {
      showNotification('Adding Blogpost Failed', 'error')
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null ?
        <LoginForm
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          handleLogin={handleLogin} />
        :
        <>
          <p>{user.name} logged in<button onClick={() => handleLogout()}>logout</button></p>

          <Togglable buttonLabel="new blog">
            <Blogform createBlog={createBlog} />
          </Togglable>

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