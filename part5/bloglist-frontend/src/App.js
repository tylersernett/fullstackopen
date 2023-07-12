import { useState, useEffect, useRef } from 'react'
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
  const blogformRef = useRef()

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

  const fetchAndUpdateBlogs = async () => {
    try {
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      //don't just do setBlogs( blogs.concat(blogObj) )...
      //...this will not have the user, as the user is extracted by the backend
    } catch (error) {
      showNotification('Fetching Blogs Failed', 'error')
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      return user
    } catch (exception) {
      showNotification('Wrong credentials', 'error')
      return null
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLike = async (id, blogObj) => {
    try {
      await blogService.update(id, blogObj)
      fetchAndUpdateBlogs();
    } catch {
      showNotification('Like Failed', 'error')
    }
  }

  const createBlog = async (blogObj) => {
    try {
      await blogService.create(blogObj)
      blogformRef.current.toggleVisibility()
      await fetchAndUpdateBlogs();
      showNotification(`Succesfully added "${blogObj.title}" by ${blogObj.author}`, 'success')
      return true
    } catch (exception) {
      showNotification('Adding Blogpost Failed', 'error')
      return null
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

          <Togglable buttonLabel="new blog" ref={blogformRef}>
            <Blogform createBlog={createBlog} />
          </Togglable>

          <h2>blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes) // Sort the blogs array based on likes in descending order
            .map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} />)
          }
        </>
      }
    </div>
  )

}

export default App