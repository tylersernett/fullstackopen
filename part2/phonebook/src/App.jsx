//hours spent on part2: 5

import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonDisplay from './components/PersonDisplay';
import PersonForm from './components/PersonForm';
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const namesToShow = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons);
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.filter((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber }

    if (personExists.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old # with a new one?`)) {
        const id = personExists[0].id
        personService.update(id, newPerson)
          .then(updatedPerson => {
            console.log(updatedPerson)
            setPersons(persons.map(person => person.id === id ? updatedPerson : person));
          })
      }
    } else {
      personService.create(newPerson)
        .then(newPerson => {
          console.log(newPerson)
          setPersons([...persons, newPerson]);
        })
    }
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService.remove(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
      <PersonDisplay namesToShow={namesToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App