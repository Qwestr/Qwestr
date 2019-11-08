import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const FriendList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [friends, setFriends] = useState([])
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the games collection
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
      <CardHeader title="Friends" />
      <CardContent>
        <List>
          {friends.map(friend => (
            <ListItem key={friend.id}>
              <ListItemText
                primary={friend.data().username}
                secondary={friend.data().email}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default FriendList
