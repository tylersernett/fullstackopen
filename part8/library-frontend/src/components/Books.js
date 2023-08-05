import { useLazyQuery } from "@apollo/client"
import { useState } from "react"
import { SOME_BOOKS } from "../queries"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all')
  const [getSomeBooks, { loading, data }] = useLazyQuery(SOME_BOOKS) // Use useLazyQuery

  if (!props.show) {
    return null
  }

  const books = props.books
  const getUniqueGenres = () => {
    const genresSet = new Set()
    books.forEach((book) => {
      book.genres.forEach((genre) => genresSet.add(genre))
    })
    genresSet.add('all')
    return Array.from(genresSet) //return Array here so Array.map can be used below
  }

  const uniqueGenres = getUniqueGenres()

  const filteredBooks = data
    ? genreFilter === 'all' ? books : data.allBooks.filter((book) => book.genres.includes(genreFilter))
    : books;

  const handleClick = async (genre) => {
    getSomeBooks({ variables: { genres: genre } })
    setGenreFilter(genre)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {loading ? <tr><td>loading...</td></tr> :
            filteredBooks.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {uniqueGenres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleClick(genre)}
          style={{ fontWeight: genre === genreFilter ? 'bold' : 'normal' }}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
