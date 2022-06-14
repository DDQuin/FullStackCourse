
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
      <Country name={country.name.common} capital={country.capital} languages={country.languages} area={country.area} flag={country.flags.png} lat={country.capitalInfo.latlng[0]} 
      lng={country.capitalInfo.latlng[1]}/>
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
    {shown &&  <Country name={country.name.common} capital={country.capital} languages={country.languages} area={country.area} flag={country.flags.png} lat={country.capitalInfo.latlng[0]} 
      lng={country.capitalInfo.latlng[1]}/>}
    <br></br>
    </>
  )
}

const Country = ({capital, area, name, languages, flag, lat, lng}) => {
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

      <Weather lat={lat} lng={lng} capital={capital}/>
    </div>
  )
}

const Weather = ({lat, lng, capital}) => {
  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key)
  const weather = axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${api_key}`)
      .then(response => {
        return response.data
      })
  const temp = weather.current.temp
  const weatherIcon = weather.current.weather.icon
  const imgUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  const wind_speed = weather.current.wind_speed
  return (
    <div>
      <h2>Weather in {capital}</h2>
      temperature {temp} Celscius
      <img src={imgUrl}></img>
      wind {wind_speed} m/s
    </div>
  )

}

export default App;
