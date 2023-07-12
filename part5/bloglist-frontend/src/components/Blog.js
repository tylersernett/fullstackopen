import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { title, author, url, likes, user } = blog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {title} - {author}<button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails &&
        <>
          <div>{url}</div>
          <div>likes: {likes}</div>
          <div>{user.name}</div>
        </>
      }
    </div>
  )
}

export default Blog