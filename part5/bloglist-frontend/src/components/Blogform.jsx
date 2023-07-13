import { useState } from 'react'

const Blogform = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('creating newblog:', newBlog)
    if (await createBlog(newBlog)) {
      setNewBlog({ title: '', author: '', url: '' }) // Reset the newBlog state
    }
  }

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

export default Blogform