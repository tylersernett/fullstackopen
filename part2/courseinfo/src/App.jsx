// import React from 'react'
// import ReactDOM from 'react-dom/client'

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      )}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return <p> {name} {exercises} </p>
}

const Total = ({ parts }) => {
  return <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

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
      },
      {
        name: 'Other stuff',
        exercises: 4,
        id: 4
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App