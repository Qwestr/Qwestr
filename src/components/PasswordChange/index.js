import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

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
    <Card>
      <CardHeader title="Change Password" />
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            name="password"
            type="password"
            label="New Password"
            fullWidth
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          {error && <p>{error.message}</p>}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!password}
          >
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export { PasswordChangeForm }

export default withFirebase(PasswordChangeForm)
