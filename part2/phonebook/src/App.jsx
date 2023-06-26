//hours spent on part2: 3

import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonDisplay from './components/PersonDisplay';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const namesToShow = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })
  }, [])
  
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