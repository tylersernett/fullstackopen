import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseVoteOf } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    if (content.length > 40) {
      content = content.slice(0, 40) + '...'
    }
    dispatch(increaseVoteOf(id))
    dispatch(createNotification(`Voted for ${content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <div>
      {/* spread anecdotes to avoid mutating state directly */}
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList