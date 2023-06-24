import { useState } from 'react'

// const Button = ({ label, function }) => {
//   return (
//     <button onClick={() => function((prev) => prev + 1) }>{label}</button>
//   )
// }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood((prev)=> prev+1)}>good</button>
      <button onClick={() => setNeutral((prev)=> prev+1)}>neutral</button>
      <button onClick={() => setBad((prev)=> prev+1)}>bad</button>

      <h2>statistics</h2>
      good: {good}
      <br/>
      neutral: {neutral}
      <br/>
      bad: {bad}
    </div>
  )
}

export default App