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
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><b>Total of {total} exercises</b></p>;
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

export default Course