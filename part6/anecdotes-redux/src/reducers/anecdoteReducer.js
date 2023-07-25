import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes', //default way of defining action.type prefix, e.g. type: "anecdotes/createAnecdote"
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      //mutation is okay with redux toolkit (immer library):
      state.push(action.payload);
    },
    increaseVoteOf(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const { createAnecdote, increaseVoteOf, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer