import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { title, author, url, likes, user } = blog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const prepareLike = () => {
    //don't send the entire user OBJECT: just send the user.id
    const updatedBlog = {...blog, likes: likes+1, user:user.id}
    handleLike(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {title} - {author}<button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails &&
        <>
          <div>{url}</div>
          <div>likes: {likes} <button onClick={() => prepareLike()}>like</button></div>
          <div>{user.name}</div>
        </>
      }
    </div>
  )
}

export default Blog