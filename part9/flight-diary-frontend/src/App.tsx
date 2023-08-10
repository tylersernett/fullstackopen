import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface Entry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

function App() {
  const [entries, setEntries] = useState<Entry[]>();

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
  }, [])

  if (!entries) {
    return null
  }

  return (
    <div className="App">
      <h2>Diary Entries</h2>
      {entries && entries.map(entry =>
        <p key={entry.id}>
          <b>{entry.date}</b>
          <br/>
          visibility: {entry.visibility}
          <br/>
          weather: {entry.weather}
        </p>
      )}
    </div>
  );
}

export default App;
