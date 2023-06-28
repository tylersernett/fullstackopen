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
    try {
      personService.getAll()
        .then(returnedPersons => {
          setPersons(returnedPersons);
        })
    } catch (error) {
      console.log('Failed to fetch persons:', error);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber }

    if (personExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old # with a new one?`)) {
        try {
          const id = personExists.id
          personService.update(id, newPerson)
            .then(updatedPerson => {
              console.log(updatedPerson)
              setPersons(persons.map(person => person.id === id ? updatedPerson : person));
            })
        } catch (error) {
          console.log('Failed to update person:', error);
        }
      }
    } else {
      try {
        personService.create(newPerson)
          .then(createdPerson => {
            console.log(createdPerson)
            setPersons([...persons, createdPerson]);
          })
      } catch (error) {
        console.log('Failed to create person:', error);
      }
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