import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button >
  )
}

const StatLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td> <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return (
    <>
      <h2>statistics</h2>
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <>
          <StatLine text='good' value={good} />
          <StatLine text='neutral' value={neutral} />
          <StatLine text='bad' value={bad} />
          <StatLine text='all' value={total} />
          <StatLine text='average' value={(good * 1 + bad * -1) / (total)} />
          <StatLine text='positive' value={100 * good / (total) + '%'} />
        </>
      ) : (
        <>
          No statistics
        </>
      )}

    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(prev => prev + 1)} text="good" />
      <Button onClick={() => setNeutral(prev => prev + 1)} text="neutral" />
      <Button onClick={() => setBad(prev => prev + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App