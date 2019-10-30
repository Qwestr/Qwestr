import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'

const QwestList = props => {
  // Deconstruct properties
  const { authUser, firebase, game } = props
  // Load state
  const [qwests, setQwests] = useState([])
  // Define methods
  const handleQwestDelete = id => {
    // Delete qwest
    firebase.qwest(id).delete()
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwests collection
    let unsubscribe
    // Determine the context of the qwest list (game or user)
    if (game) {
      unsubscribe = firebase.gameQwests(game).onSnapshot(snapshot => {
        setQwests(snapshot.docs)
      })
    } else {
      unsubscribe = firebase.userQwests(authUser).onSnapshot(snapshot => {
        setQwests(snapshot.docs)
      })
    }
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, game])
  // Return component
  return (
    <Card>
      <CardHeader title="Qwests" />
      <CardContent>
        <List>
          {qwests.map(qwest => (
            <ListItem key={qwest.id}>
              <ListItemText primary={qwest.data().name} />
              <ListItemSecondaryAction>
                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleQwestDelete(qwest.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default QwestList
