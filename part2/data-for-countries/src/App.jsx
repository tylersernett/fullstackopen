import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const Search = ({ searchString, setSearchString }) => {
  return (
    <>
      Search countries: <input value={searchString} onChange={(e) => setSearchString(e.target.value)}></input>
    </>
  )
}

function App() {
  const [countries, setCountries] = useState(null);
  const [searchString, setSearchString] = useState("");

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchString.toLowerCase()));

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
      .catch(error => console.log(error))

    return () => {
    }
  }, [])


  return (
    <>
      <Search searchString={searchString} setSearchString={setSearchString} />

      {searchString !== "" &&
        filteredCountries.length === 1 ? (
        <div>match</div>
      )
        :
        filteredCountries.length <= 10 ? (
          filteredCountries.map(country =>
            <div key={country.name.common}>{country.name.common}</div>
          )
        ) : (
          <div>Too many matches, specify another filter</div>
        )
      }
    </>
  )
}

export default App
