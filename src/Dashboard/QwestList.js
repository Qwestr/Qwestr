import React, { useState } from 'react'
import Aux from 'react-aux'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

import firebase from '../store/firebase'

const QwestList = () => {
  // Load state
  const [qwests, setQwests] = useState([])
  // Define methods
  const handleQwestDelete = id => {
    // TODO: Refactor firebase code
    // Create firestore instance
    const db = firebase.firestore()
    // Remove collection item
    db.collection('qwests')
      .doc(id)
      .delete()
  }

  // TODO: Refactor firebase code
  // Create firestore instance
  const db = firebase.firestore()
  // Load collection
  db.collection('qwests')
    .get()
    .then(querySnapshot => {
      setQwests(querySnapshot.docs)
    })

  // Return component
  return (
    <Aux>
      <Typography variant="h5" gutterBottom>
        Qwests
      </Typography>
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
    </Aux>
  )
}

export default QwestList
