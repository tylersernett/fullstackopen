import { CoursePart } from '../types'
import Part from './Part'

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