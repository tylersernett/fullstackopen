const FilteredBooks = ({ loading, filteredBooks }) => {
  return (
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
  )
}

export default FilteredBooks