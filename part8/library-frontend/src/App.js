import { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
  `
  const resultAuthors = useQuery(ALL_AUTHORS)

  const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      author
      published
    }
  }
  `
  const resultBooks = useQuery(ALL_BOOKS)

  if (resultAuthors.loading) {
    return <div>loading...</div>
  }

  if (resultBooks.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} />

      <Books show={page === 'books'} books={resultBooks.data.allBooks}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
