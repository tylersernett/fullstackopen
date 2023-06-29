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

const DisplayCountry = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map(key => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <div><img src={`${country.flags.svg}`} height={'100px'} /></div>
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
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
        <DisplayCountry country={filteredCountries[0]} />
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
