import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  }, [])


  

  const addPerson = (event) => {
    event.preventDefault()
    

    const samePerson = persons.find(e => e.name === newName)
    if (samePerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...samePerson, number: newNumber}
        personService
          .update(samePerson.id, changedPerson).then(returnedPerson => {
              setPersons(persons.map(person => person.id !== samePerson.id ? person : returnedPerson))
              setSuccessMessage(
                `Updated ${returnedPerson.name}`
              )
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${error.response.data}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
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
        setSuccessMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        // this is the way to access the error message
        setErrorMessage(
          `${error.response.data}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    
  }

  const deletePerson = (id, name) => {
    personService.deleteObj(id)
    .then(returnedPerson => {
      setPersons(persons.filter(p => p.id !== id))
    })
    .catch(error => {
      setErrorMessage(
        `Information of ${name} was already removed from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
      <ErrorNotification message={errorMessage}/>
      <Notification message={successMessage}/>
      

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
      return <Person key={person.id} name={person.name} number={person.number} onDelete={() => onDelete(person.id, person.name)}/>
    })
    }
    </>
  )
}

const Notification = ({ message }) => {

  const successStyle = { 
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    
  }
  if (message === null) {
    return null
  }

  return (
    <div style={successStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  const errorStyle = { 
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  
}
  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
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