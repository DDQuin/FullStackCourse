import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
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

    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    
  }

  const deletePerson = id => {
    personService.deleteObj(id)
    .then(returnedPerson => {
      setPersons(persons.filter(p => p.id !== id))
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
      
      <Persons persons={personsToShow} onDelete={deletePerson}/>
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

const Persons = ({persons, onDelete}) => {
  return (
    <>
    {persons.map(person => {
      return <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person.id)}/>
    })
    }
    </>
  )
}

const Person = (props) => {
  const deleteAfterConfirm = () => {
    if (window.confirm(`Delete ${props.name}?`)) {
      props.onDelete()
    }
  }
  return (
    <p> {props.name} {props.number} <button onClick={deleteAfterConfirm}>delete</button></p>
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