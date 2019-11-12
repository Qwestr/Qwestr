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

const GameInviteList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [invites, setInvites] = useState([])
  // Define methods
  const acceptGameInvite = invite => {
    // Accept game invite
    firebase.acceptGameInvite(invite)
    // Delete invite
    firebase.invite(invite.id).delete()
  }

  const rejectGameInvite = invite => {
    // TODO: put functionality to reject game invite here
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the invites collection
    const unsubscribe = firebase
      .gameInvitesForUser(authUser.uid)
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
      <CardHeader title="Game Invites" />
      <CardContent>
        <List>
          {invites.map(invite => (
            <ListItem key={invite.id}>
              <ListItemText primary={invite.data().gameName} />
              <ListItemSecondaryAction>
                <Grid container spacing={3}>
                  <Grid item>
                    <IconButton
                      color="primary"
                      edge="end"
                      aria-label="accept"
                      onClick={() => acceptGameInvite(invite)}
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="secondary"
                      edge="end"
                      aria-label="delete"
                      onClick={() => rejectGameInvite(invite)}
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

export default GameInviteList
