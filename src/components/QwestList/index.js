import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'

import ConfirmDialog from '../ConfirmDialog'

const QwestList = props => {
  // Deconstruct properties
  const { authUser, firebase, game } = props
  // Load state
  const [qwests, setQwests] = useState([])
  const [qwest, setQwest] = useState(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  // Define methods
  const confirmQwestDelete = qwest => {
    // Set qwest
    setQwest(qwest)
    // Open confirm dialog
    setIsConfirmDialogOpen(true)
  }

  const handleQwestDelete = confirm => {
    if (confirm) {
      // Delete qwest
      firebase.qwest(qwest.id).delete()
    }
    // Close confirm dialog
    setIsConfirmDialogOpen(false)
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwests collection
    let unsubscribe
    // Determine the context of the qwest list (game or user)
    if (game) {
      unsubscribe = firebase.gameQwests(game.id).onSnapshot(snapshot => {
        setQwests(snapshot.docs)
      })
    } else {
      unsubscribe = firebase.userQwests(authUser.uid).onSnapshot(snapshot => {
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
    <Aux>
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
                    onClick={() => confirmQwestDelete(qwest)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        handleClose={handleQwestDelete}
        title="Delete Qwest"
        message="Are you sure you want to delete this qwest?  This cannot be undone."
      />
    </Aux>
  )
}

export default QwestList
