import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, loggedInUser }) => {
  const [showDetails, setShowDetails] = useState(false)
  const { title, author, url, likes, user } = blog
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const prepareLike = () => {
    //don't send the entire user OBJECT: just send the user.id
    const updatedBlog = { ...blog, likes: likes + 1, user: user.id }
    handleLike(blog.id, updatedBlog)
  }

  const prepareDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${title} by ${author}?`)) {
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {title} - {author}<button className='blog-view' onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails &&
        <div className='blog-details'>
          <div>{url}</div>
          <div>likes: {likes} <button className='like-button' onClick={() => prepareLike()}>like</button></div>
          <div>{user.name}</div>
          {user.username === loggedInUser.username && <div><button onClick={() => prepareDelete()}>remove</button></div>}
        </div>
      }
    </div>
  )
}

export default Blog