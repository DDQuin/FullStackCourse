import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Feedback feedback="good" amount={good}/>
      <br/>
      <Feedback feedback="neutral" amount={neutral}/>
      <br/>
      <Feedback feedback="bad" amount={bad}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Feedback = (props) => {
  return (
    <>
    {props.feedback} {props.amount}
    </>
  )
}

export default App