import React from 'react'

import { CoursePart } from '../types'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) =>
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      )}
    </>
  )
}

export default Content