import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { title, author, url, likes, user } = blog;

  return (
    <div>
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