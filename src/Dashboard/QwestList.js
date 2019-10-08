import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

import firestore from '../store/firestore'

const QwestList = () => {
  console.log('QwestList being rendered!')
  // Load state
  const [qwests, setQwests] = useState([])
  // Define methods
  const handleQwestDelete = id => {
    // Remove collection item
    firestore
      .collection('qwests')
      .doc(id)
      .delete()
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the collection
    const listener = firestore.collection('qwests').onSnapshot(snapshot => {
      console.log('qwests loaded!')
      setQwests(snapshot.docs)
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      console.log('qwests listener destroyed!')
      listener()
    }
  }, [])
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
