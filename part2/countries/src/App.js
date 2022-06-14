
import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterName, setFilterName] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()));

  return (
    <div>
       <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
       <Countries countries={countriesToShow}/>
    </div>
    
  );
}

const Filter = (props) => {
  return (
    <>
    find countries <input value={props.filterName} onChange={props.handleFilterChange} />
    <br></br>
    </>
  )
}

const Countries = ({countries}) => {
  if (countries.length > 10) {
    return (
      <>
      Too many matches, specify another filter
      <br></br>
      </>
    )
  }
  if (countries.length == 1) {
    const country = countries[0]
    return (
      <Country name={country.name.common} capital={country.capital} languages={country.languages} area={country.area} flag={country.flags.png}/>
    )
  }
  return (
    <>
    {countries.map(country => {
      return <CountrySimple key={country.name.common} country={country}/>
    })
    }
    </>
  )
}

const CountrySimple = ({country}) => {
  const [shown, setShown] = useState(false);
  return (
    <>
    {country.name.common} <button onClick={() => setShown(!shown)}>Show</button>
    {shown &&  <Country name={country.name.common} capital={country.capital} languages={country.languages} area={country.area} flag={country.flags.png}/>}
    <br></br>
    </>
  )
}

const Country = ({capital, area, name, languages, flag}) => {
  const languageItems = Object.keys(languages).map(languageKey => {
    return <li>{languages[languageKey]}</li>
  })
  return (
    <div>
      <h1>{name}</h1>
      capital {capital}
      <br></br>
      area {area}

      <h2>languages: </h2>
      <ul>{languageItems}</ul>
      <img src={flag}></img>
    </div>
  )
}

export default App;
