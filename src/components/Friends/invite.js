import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'

const FriendInviteForm = props => {
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

  const onSubmit = async event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Set email to lowercase
    const invitedEmail = email.toLowerCase()
    // Make sure the user is not trying to invite themselves
    if (invitedEmail === authUser.email) {
      // Set error and return
      setError('You cannot invite yourself!')
      return
    }
    // Find the user by email address
    let snapshot = await firebase.findUserForEmail(invitedEmail).get()
    // Check if the user does not exist
    if (snapshot.empty) {
      // Set error and return
      setError('No user with the provided email address was found.')
      return
    }
    // Get user from snapshot
    const user = snapshot.docs[0]
    // Make sure the user is not already a friend
    snapshot = await firebase
      .findUserFriendForEmail(user.data().email, authUser.uid)
      .get()
    // Check if the user exists
    if (!snapshot.empty) {
      // Set error and return
      setError('This user is already a friend.')
      return
    }
    // Find sent invites for user
    snapshot = await firebase
      .findSentInvitesForUser(user.id, authUser.uid)
      .get()
    // Check if the sent invite exists
    if (!snapshot.empty) {
      // Set error and return
      setError('An invite has already been sent to this user.')
      return
    }
    // Find received invites for user
    snapshot = await firebase
      .findReceivedInvitesForUser(user.id, authUser.uid)
      .get()
    // Check if the received invite exists
    if (!snapshot.empty) {
      // Set error and return
      setError('An invite has already been received from this user.')
      return
    }
    // Create new invite object
    const newInvite = {
      requesterId: authUser.uid,
      requesterUsername: authUser.username,
      requesterEmail: authUser.email,
      requestedId: user.id,
      requestedUsername: user.data().username,
      requestedEmail: user.data().email,
      gameId: null,
      gameName: null,
      createdAt: firebase.FieldValue.serverTimestamp(),
    }
    // Create new invite
    firebase.createInvite(newInvite)
    // Clear the form
    clearForm()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Add Friend" />
      <form onSubmit={onSubmit}>
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

const SentInviteList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [invites, setInvites] = useState([])
  // Define methods
  const deleteFriendInvite = invite => {
    // TODO: put functionality to delete friend invite here
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the invites collection
    const unsubscribe = firebase
      .sentUserInvites(authUser.uid)
      .onSnapshot(snapshot => {
        setInvites(snapshot.docs)
      })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase])
  // Return component
  return (
    <Card>
      <CardHeader title="Sent Invites" />
      <CardContent>
        <List>
          {invites.map(invite => (
            <ListItem key={invite.id}>
              <ListItemText
                primary={invite.data().requestedUsername}
                secondary={invite.data().requestedEmail}
              />
              <ListItemSecondaryAction>
                <Grid container spacing={3}>
                  <Grid item>
                    <IconButton
                      color="secondary"
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteFriendInvite(invite)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

const ReceivedInviteList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [invites, setInvites] = useState([])
  // Define methods
  const acceptFriendInvite = invite => {
    // Update friends lists, your friends now, yay!
    firebase.acceptFriendInvite(invite)
    // Delete invite
    firebase.invite(invite.id).delete()
  }

  const rejectFriendInvite = invite => {
    // TODO: put functionality to reject friend invite here
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the invites collection
    const unsubscribe = firebase
      .receivedUserInvites(authUser.uid)
      .onSnapshot(snapshot => {
        setInvites(snapshot.docs)
      })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase])
  // Return component
  return (
    <Card>
      <CardHeader title="Received Invites" />
      <CardContent>
        <List>
          {invites.map(invite => (
            <ListItem key={invite.id}>
              <ListItemText
                primary={invite.data().requesterUsername}
                secondary={invite.data().requesterEmail}
              />
              <ListItemSecondaryAction>
                <Grid container spacing={3}>
                  <Grid item>
                    <IconButton
                      color="primary"
                      edge="end"
                      aria-label="accept"
                      onClick={() => acceptFriendInvite(invite)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="secondary"
                      edge="end"
                      aria-label="delete"
                      onClick={() => rejectFriendInvite(invite)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export { FriendInviteForm, ReceivedInviteList, SentInviteList }