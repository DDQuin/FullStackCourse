import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const personObj = {
      name: newName,
      number: newNumber
    }
    axios
    .post('http://localhost:3001/persons', personObj)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
    
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = filterName === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>

      <PersonsForm 
      addPerson={addPerson} 
      newName={newName}
      handlePersonChange={handlePersonChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Persons persons={personsToShow}/>
    </div>
  )
}

const Filter = (props) => {
  return (
    <>
    filter shown with <input value={props.filterName} onChange={props.handleFilterChange} />
    </>
  )
}

const Persons = ({persons}) => {
  return (
    <>
    {persons.map(person => {
      return <Person key={person.name} name={person.name} number={person.number}/>
    })
    }
    </>
  )
}

const Person = (props) => {
  return (
    <p> {props.name} {props.number}</p>
  )
}

const PersonsForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handlePersonChange} />
        </div>
        <div>number: <input  value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  )
}

export default App