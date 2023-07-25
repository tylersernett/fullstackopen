import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes', //default way of defining action.type prefix, e.g. type: "anecdotes/createAnecdote"
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { increaseVoteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToChange = state.anecdotes.find(n => n.id === id)
    const newObject = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }

    const updatedAnecdote = await anecdoteService.update(id, newObject)
    dispatch(setAnecdotes(state.anecdotes.map(anecdote =>
      anecdote.id !== id ? anecdote : updatedAnecdote
    )))

  }
}

export default anecdoteSlice.reducer