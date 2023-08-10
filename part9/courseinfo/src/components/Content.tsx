import { CoursePart } from '../types'

const Part = ({ part }: { part: CoursePart }) => {
  let content: JSX.Element | null = null;

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
    case "background":
      content = (
        <>
          <i>{part.description}</i>
        </>
      );
      break;

    case "group":
      content = (
        <>
          project exercises: {part.groupProjectCount}
        </>
      );
      break;

    default:
      return assertNever(part);
  }

  return content &&
    <p key={part.name}>
      <b>{part.name} {part.exerciseCount}</b>
      <br />
      {content}
    </p>;
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) =>
        <Part key={part.name} part={part} />
      )}
    </>
  )
}

export default Content