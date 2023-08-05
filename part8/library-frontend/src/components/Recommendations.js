import FilteredBooks from "./FilteredBooks"

const Recommendations = ({ show, books, favoriteGenre }) => {
  if (!show) {
    return null
  }

  const filteredBooks = books.filter((book) => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <FilteredBooks filteredBooks={filteredBooks} />
    </div>
  )
}

export default Recommendations