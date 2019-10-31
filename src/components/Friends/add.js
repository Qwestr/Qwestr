import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const FriendAdd = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  // Define methods
  const clearForm = () => {
    setEmail('')
    setError('')
  }

  const onSubmit = (event, authUser) => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Set email to lowercase
    const invitedEmail = email.toLowerCase()
    // Make sure the user is not trying to invite themselves
    if (invitedEmail === authUser.email) {
      setError('You cannot invite yourself!')
      return
    }
    // Find the user by email address
    firebase
      .findUserByEmail(invitedEmail)
      .get()
      .then(snapshot => {
        // Check if the user does not exist
        if (snapshot.empty) {
          // Set error
          setError(
            'No user with the provided email address was found.  Please try again.',
          )
        } else {
          // Get user from snapshot
          const user = snapshot.docs[0]
          // Find invites for user
          firebase
            .findInvitesForUser(user, authUser)
            .get()
            .then(snapshot => {
              // Check if the invite exists
              if (!snapshot.empty) {
                // Set error
                setError('An invite has already been sent to this user.')
              } else {
                // Create new invite object
                const newInvite = {
                  requesterId: authUser.uid,
                  requestedId: user.id,
                  createdAt: props.firebase.serverValues.serverTimestamp(),
                }
                // Add new invite
                props.firebase.invites().add(newInvite)
                // Clear the form
                clearForm()
              }
            })
        }
      })
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Add Friend" />
      <form onSubmit={event => onSubmit(event, authUser)}>
        <CardContent>
          <TextField
            id="email"
            label="Email"
            fullWidth
            error={!!error}
            helperText={error}
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!email}
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FriendAdd
