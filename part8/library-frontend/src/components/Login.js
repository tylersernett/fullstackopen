import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'


const Login = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      console.error(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('loggedLibraryAppUser', token)
    }
  }, [result.data]) // eslint-disable-line

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await login({ variables: { username, password } })
    } catch (error) {
      console.error('Login error:', error.message)
    }
  }
  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
         <button type="submit" >login</button>
         {/* disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        
        {error && <div>Error: {error.message}</div>} */}
      </form>
    </div>
  )
}

export default Login
