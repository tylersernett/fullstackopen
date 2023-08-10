import { useState, useEffect } from 'react';
import './App.css';
import axios, {AxiosError} from 'axios';
import { Entry, NewEntry } from './types';
import DiaryEntries from './components/DiaryEntries';

function App() {
  const [entries, setEntries] = useState<Entry[]>();
  // const [newEntry, setNewEntry] = useState<NewEntry>();
  const [notification, setNotification] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/diaries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error getting diaries:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotification('');
    }, 5000);
    
  }, [notification])
  

  if (!entries) {
    return null;
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    // setNewEntry({ date, visibility, weather, comment })
    const newEntry: NewEntry = { date, visibility, weather, comment };
    try {
      const response = await axios.post<Entry>('http://localhost:3000/api/diaries', newEntry)
      const createdEntry: Entry = { ...newEntry, id: response.data.id }; // Assuming the response has an "id" field
      setEntries([...entries, createdEntry]);
      // setDate('');
      // setVisibility('');
      // setWeather('');
      // setComment('');
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

  function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
  }

  return (
    <div className="App">
      <h2>Add new entry</h2>
      {notification && <span style={{color:'red'}}>Error: {notification}</span>}
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

      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
