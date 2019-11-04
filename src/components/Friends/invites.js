import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'

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
      .sentUserInvites(authUser)
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
      .receivedUserInvites(authUser)
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

export { ReceivedInviteList, SentInviteList }
