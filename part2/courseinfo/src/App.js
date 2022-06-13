const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
          <Course key={course.id} course={course} />
        )}
    </div>
  )
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