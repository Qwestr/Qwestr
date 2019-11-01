import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const SentInviteList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [invites, setInvites] = useState([])
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
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export { ReceivedInviteList, SentInviteList }
