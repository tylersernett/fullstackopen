import { useLazyQuery } from "@apollo/client"
import { useState } from "react"
import { SOME_BOOKS } from "../queries"
import FilteredBooks from './FilteredBooks'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('all')
  const [getSomeBooks, { loading, data }] = useLazyQuery(SOME_BOOKS) // Use useLazyQuery for user filtering

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

  const handleClick = (genre) => {
    getSomeBooks({ variables: { genres: genre } })
    setGenreFilter(genre)
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genreFilter}</b>
      </p>

      <FilteredBooks loading={loading} filteredBooks={filteredBooks}/>

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
