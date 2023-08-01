import { useState } from 'react'
import Select from 'react-select'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [birthYear, setBirthYear] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }], //update other views
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      console.error('Error updating author: ', messages)
    }
  })

  if (!props.show) {
    return null
  }
  
  const authors = props.authors
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('update author...')
    const yearInt = parseInt(birthYear)
    updateAuthor({ variables: { name: selectedAuthor.value, setBornTo: yearInt } })

    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set Birthyear</h3>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
        />
        <div>
          born:
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>

    </div>
  )
}

export default Authors
