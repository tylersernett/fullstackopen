import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Entry } from './types';
import DiaryEntries from './components/DiaryEntries';

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
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
