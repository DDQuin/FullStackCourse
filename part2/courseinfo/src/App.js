const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  const partsCopy = [...course.parts]
  const totalSum = partsCopy.reduce((s, p) => {
    console.log('what is happening', s, p)
    const newPart = {exercises: s.exercises + p.exercises}
    return newPart;
  } )
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={totalSum.exercises}/>
    </div>
  )
}

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(partA => 
          <Part key={partA.id} part={partA.name} exercise={partA.exercises} />
        )}
    </div>
  )
}

const Part = ({part, exercise}) => {
  return (
    <p>
      {part} {exercise}
    </p>
  )
}

const Total = ({sum}) => {
  return (
    <p>Number of exercises {sum}</p>
  )
}

export default App