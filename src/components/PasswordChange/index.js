import React, { useState } from 'react'
import { withFirebase } from '../Firebase'

const PasswordChangeForm = props => {
  // Load state
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  // Define methods
  const clearForm = () => {
    setPassword('')
    setError(null)
  }

  const onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Update password
    props.firebase
      .doPasswordUpdate(password)
      .then(() => {
        // Clear form
        clearForm()
      })
      .catch(error => {
        // Set error
        setError(error)
      })
  }
  // Return component
  return (
    <form onSubmit={onSubmit}>
      <input
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        type="password"
        placeholder="New Password"
      />
      <button disabled={!password} type="submit">
        Reset My Password
      </button>
      {error && <p>{error.message}</p>}
    </form>
  )
}

export default withFirebase(PasswordChangeForm)
