import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogform from './components/Blogform'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
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
        <LoginForm handleLogin={handleLogin} />
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