import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS } from '../queries'
import { updateCacheWith } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const client = useApolloClient()
  const [createBook] = useMutation(CREATE_BOOK, {
    // refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }], //refetch solution, used before update callback below
    onError: (error) => {      
      const messages = error?.graphQLErrors[0]?.message      
      console.error('Error creating book: ', messages) 
    },
    update: (cache, response) => {
      updateCacheWith(client, ALL_BOOKS, response.data.addBook)
      // updateCacheWith(client, ALL_AUTHORS, response.data.addBook.author) //updating author view handled by subscription in App.js
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    const pubInt = parseInt(published)
    createBook({ variables: { title: title, author: author, published: pubInt, genres: genres } })

    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook