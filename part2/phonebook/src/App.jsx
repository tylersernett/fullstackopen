import { useState } from 'react'

const Filter = ({ filter, setFilter }) => {

  return (
    <>
      filter by name: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, handleSubmit }) => {
  return (
    <>
      <h3>Add new entry</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const PersonDisplay = ({namesToShow}) => {
  return (
    <>
      <h3>Numbers</h3>
      <ul>
        {namesToShow.map(person => <li key={person.name}>{person.name}: {person.number}</li>)}
      </ul>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const namesToShow = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const updatedPersons = [...persons, { name: newName, number: newNumber }];
      setPersons(updatedPersons);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
      <PersonDisplay namesToShow={namesToShow} />
    </div>
  )
}

export default App