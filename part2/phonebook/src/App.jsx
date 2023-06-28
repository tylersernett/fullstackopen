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
    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService.create(newPerson)
        .then(newPerson => {
          console.log(newPerson)
          setPersons([...persons, newPerson]);
        })
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