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
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'

const GameInviteForm = props => {
  // Deconstruct properties
  const { authUser, firebase, game } = props
  // Load state
  const [friends, setFriends] = useState([])
  const [friend, setFriend] = useState('')
  const [error, setError] = useState('')
  // Define methods
  const clearForm = () => {
    setFriend('')
    setError('')
  }

  const onSubmit = async event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Find sent invites for user
    let snapshot = await firebase
      .findSentGameInvitesForUser(friend.id, game.id)
      .get()
    // Check if the sent invite exists
    if (!snapshot.empty) {
      // Set error and return
      setError('An invite has already been sent to this user.')
      return
    }
    // TODO: make sure a user who is already a player of the game is not invited
    // Create new invite object
    const newInvite = {
      requesterId: authUser.uid,
      requesterUsername: authUser.username,
      requesterEmail: authUser.email,
      requestedId: friend.id,
      requestedUsername: friend.data().username,
      requestedEmail: friend.data().email,
      gameId: game.id,
      gameName: game.data().name,
      createdAt: firebase.FieldValue.serverTimestamp(),
    }
    // Create new invite
    firebase.createInvite(newInvite)
    // Clear the form
    clearForm()
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the friends collection
    const unsubscribe = firebase
      .userFriends(authUser.uid)
      .onSnapshot(snapshot => {
        setFriends(snapshot.docs)
      })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase])
  // Return component
  return (
    <Card>
      <CardHeader title="Invite Friend" />
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            id="friend"
            label="Friend"
            fullWidth
            select
            error={!!error}
            helperText={error}
            value={friend}
            onChange={event => setFriend(event.target.value)}
          >
            {friends.map(friend => (
              <MenuItem key={friend.id} value={friend}>
                {friend.data().username}
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!friend}
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

const GameInviteList = props => {
  // Deconstruct properties
  const { firebase, game } = props
  // Load state
  const [invites, setInvites] = useState([])
  // Define methods
  const deleteGameInvite = invite => {
    // TODO: put functionality to delete game invite here
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the invites collection
    const unsubscribe = firebase
      .sentGameInvites(game.id)
      .onSnapshot(snapshot => {
        setInvites(snapshot.docs)
      })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [firebase, game])
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
                      onClick={() => deleteGameInvite(invite)}
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

export { GameInviteForm, GameInviteList }
