import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../queries'


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const { data } = await login({
        variables: {
          username,
          password,
        },
      })

      // Assuming the login mutation returns a token value
      const token = data.login.value
      // You can save the token in localStorage or a state management tool like Redux
      console.log('Token:', token)

      // Redirect to a protected route or perform any other action after successful login
      window.localStorage.setItem('loggedLibraryAppUser', JSON.stringify(data.user))
      // blogService.setToken(user.token)
      // setUser(user)
      // return user
    } catch (error) {
      console.error('Login error:', error.message)
    }
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div>Error: {error.message}</div>}
      </form>
    </div>
  )
}

export default Login
