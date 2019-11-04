import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const PlayerInvite = props => {
  // Deconstruct properties
  const { authUser, firebase, game } = props
  // Load state
  const [friends, setFriends] = useState([])
  const [player, setPlayer] = useState('')
  const [error, setError] = useState('')
  // Define methods
  const clearForm = () => {
    setPlayer('')
    setError('')
  }

  const onSubmit = async event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // // Find sent invites for user
    // snapshot = await firebase.findSentInvitesForUser(user, authUser).get()
    // // Check if the sent invite exists
    // if (!snapshot.empty) {
    //   // Set error and return
    //   setError('An invite has already been sent to this user.')
    //   return
    // }
    // // Find received invites for user
    // snapshot = await firebase.findReceivedInvitesForUser(user, authUser).get()
    // // Check if the received invite exists
    // if (!snapshot.empty) {
    //   // Set error and return
    //   setError('An invite has already been received from this user.')
    //   return
    // }
    // Create new invite object
    const newInvite = {
      requesterId: authUser.uid,
      requesterUsername: authUser.username,
      requesterEmail: authUser.email,
      requestedId: player.id,
      requestedUsername: player.data().username,
      requestedEmail: player.data().email,
      requestedGameId: game.id,
      requestedGameName: game.data().name,
      createdAt: firebase.FieldValue.serverTimestamp(),
    }
    // Add new invite
    props.firebase.invites().add(newInvite)
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
      <CardHeader title="Invite Player" />
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            id="player"
            label="Player"
            fullWidth
            select
            error={!!error}
            helperText={error}
            value={player}
            onChange={event => setPlayer(event.target.value)}
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
            disabled={!player}
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default PlayerInvite
