//hours spent on part2: 6

import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonDisplay from './components/PersonDisplay';
import PersonForm from './components/PersonForm';
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const namesToShow = (filter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    personService.getAll()
      .then(returnedPersons => { setPersons(returnedPersons) })
      .catch(error => {
        console.log('Failed to fetch persons database:', error)
        showNotification(`Failed to load database`, 'error');
      });
  }, []);


  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personExists = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newNumber }

    if (personExists) {
      //UPDATE
      if (window.confirm(`${newName} is already added to phonebook, replace the old # with a new one?`)) {
        const id = personExists.id
        personService.update(id, newPerson)
          .then(updatedPerson => {
            console.log(updatedPerson)
            setPersons(persons.map(person => person.id === id ? updatedPerson : person));
            showNotification(`Updated ${newName}`, 'success');
          })
          .catch(error => {
            console.log(`Failed to find person "${newName}" on server:`, error);
            showNotification(`Info for ${newName} already deleted from server`, 'error');
          })
      }
    } else {
      //CREATE
      personService.create(newPerson)
        .then(createdPerson => {
          console.log(createdPerson)
          setPersons([...persons, createdPerson]);
          showNotification(`Added ${newName}`, 'success');
        })
        .catch(error => {
          console.log(`Failed to create person ${newName}:`, error)
          showNotification(`Failed to create entry for ${newName}`, 'error');
        })

    }
  }

  const handleDelete = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService.remove(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${name}`, 'success');
        })
        .catch(error => {
          console.log(`Failed to delete person ${name}:`, error)
          showNotification(`Failed to delete ${name}`, 'error');
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
      <PersonDisplay namesToShow={namesToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App