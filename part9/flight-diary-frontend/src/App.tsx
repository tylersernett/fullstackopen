import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Entry } from './types';
import DiaryEntries from './components/DiaryEntries';
import DiaryForm from './components/DiaryForm';

function App() {
  const [entries, setEntries] = useState<Entry[]>();

  //initial data fetch
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

  if (!entries) {
    return null;
  }

  return (
    <div className="App">
      <h2>Add new entry</h2>
      <DiaryForm entries={entries} setEntries={setEntries} />
      <DiaryEntries entries={entries} />
    </div>
  );
}

export default App;
