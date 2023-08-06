import { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, GET_ME } from './queries'

export const updateCacheWith = (client, query, addedBook) => {
  const includedIn = (set, object) =>
  set.map(p => p.title).includes(object.title)
  
  const dataInStore = client.readQuery({ query: query }) 
  if (!includedIn(dataInStore.allBooks, addedBook)) {
    client.writeQuery({
      query: query,
      data: {
        allBooks: [...dataInStore.allBooks, addedBook],
      },
    }) 
  }
} 

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(GET_ME, {
    skip: !token //don't execute query if user not logged in
  })

  //check for existing login
  useEffect(() => {
    const token = localStorage.getItem('loggedLibraryAppUser')
    if (token) {
      setToken(token)
    }
  }, [])

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log("data", data)
      const addedBook = data.data.bookAdded
      updateCacheWith(client, ALL_BOOKS, addedBook, 'allBooks')
      window.alert(`New book "${addedBook.title}" added`)

      //Update Author view cache:
      const dataInStore = client.readQuery({ query: ALL_AUTHORS }) 
      const updatedAuthor = {...addedBook.author, bookCount: addedBook.author.bookCount+1}
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: dataInStore.allAuthors.map((a)=>a.name===updatedAuthor.name? updatedAuthor : a),
        },
      }) 
    },
  })

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('loggedLibraryAppUser') 
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token &&
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>recommend</button>
          </>
        }
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data.allAuthors} />

      <Books show={page === 'books'} books={resultBooks.data.allBooks} />

      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommendations'} books={resultBooks.data.allBooks} favoriteGenre={resultUser?.data?.me?.favoriteGenre} />
      <Login show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
