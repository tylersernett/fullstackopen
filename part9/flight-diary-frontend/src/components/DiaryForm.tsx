import { useState, useEffect } from 'react';
import { NewEntry, Entry } from '../types';
import axios, { AxiosError } from 'axios';

const DiaryForm = ({ entries, setEntries }: { entries: Entry[], setEntries: (entries: Entry[]) => void }) => {
  const [notification, setNotification] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  //reset notification after 5 seconds
  useEffect(() => {
    if (notification !== '') { //prevent running on initialization
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  }, [notification])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewEntry = { date, visibility, weather, comment };
    try {
      const response = await axios.post<Entry>('http://localhost:3000/api/diaries', newEntry)
      const createdEntry: Entry = { ...newEntry, id: response.data.id }; // Assuming the response has an "id" field
      setEntries([...entries, createdEntry]);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error) {
      console.error('Error posting new entry: ', error);
      if (isAxiosError(error)) {
        if (error.response?.data) {
          setNotification(`An error occurred: ${error.response.data}`);
        } else {
          setNotification('An error occurred while adding the entry.');
        }
      } else {
        setNotification('An unknown error occurred while adding the entry.');
      }
    }
  }

  function isAxiosError(error: unknown): error is AxiosError {
    return error instanceof AxiosError
  }

  return (
    <>
      {notification && <span style={{ color: 'red' }}>Error: {notification}</span>}
      <form onSubmit={(e) => handleSubmit(e)}>
        date
        <input type='text' onChange={(e) => setDate(e.target.value)}></input>
        <br />
        visibility
        <input type='text' onChange={(e) => setVisibility(e.target.value)}></input>
        <br />
        weather
        <input type='text' onChange={(e) => setWeather(e.target.value)}></input>
        <br />
        comment
        <input type='text' onChange={(e) => setComment(e.target.value)}></input>
        <br />
        <button type='submit'>add</button>
      </form>
    </>
  )
}

export default DiaryForm