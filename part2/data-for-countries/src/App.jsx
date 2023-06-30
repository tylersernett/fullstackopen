import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'

const api_key = import.meta.env.VITE_WEATHER_API_KEY;

const Search = ({ searchString, setSearchString }) => {
  return (
    <>
      Search countries: <input value={searchString} onChange={(e) => setSearchString(e.target.value)}></input>
    </>
  )
}

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const capital = country.capital;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => console.log(error))
  }, [capital])

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital: {capital}</div>
      <div>area: {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map(key => (
          <li key={country.languages[key]}>{country.languages[key]}</li>
        ))}
      </ul>
      <div><img
        src={`${country.flags.svg}`}
        alt={`${country.name.common} flag`}
        height={'100px'}
      />
      </div>

      <h3>Weather in {capital}</h3>
      {weather &&
        <>
          <div>temperature: {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>wind: {weather.wind.speed} m/s</div>
        </>
      }

    </>
  )
}

const FilteredCountry = ({ country }) => {
  const [showView, setShowView] = useState(false);
  return (
    <div>
      {country.name.common}
      <button onClick={() => setShowView(!showView)}>{showView ? 'Hide' : 'Show'}</button>
      {showView && <CountryDetails country={country} />}
    </div>
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
  }, [])

  return (
    <>
      <Search searchString={searchString} setSearchString={setSearchString} />

      {searchString !== "" &&
        filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      )
        :
        filteredCountries.length <= 10 ? (
          filteredCountries.map(country =>
            <FilteredCountry key={country.name.common} country={country} />
          )
        ) : (
          <div>Too many matches, specify another filter</div>
        )
      }
    </>
  )
}

export default App
