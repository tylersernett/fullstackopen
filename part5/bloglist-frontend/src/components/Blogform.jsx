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
    <form onSubmit={addBlog} className='blogform-form'>
      <h2>Create New Blog</h2>
      <div>
        title:
        <input
          className='blogform-title'
          value={title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          placeholder='title'
        />
      </div>
      <div>
        author:
        <input
          className='blogform-author'
          value={author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          placeholder='author'
        />
      </div>
      <div>
        URL:
        <input
          className='blogform-url'
          value={url}
          onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          placeholder='URL'
        />
      </div>
      <button className='blogform-submit' type="submit">create</button>
    </form>
  )
}

export default Blogform