import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'

import * as ROUTES from '../../constants/routes'
import ConfirmDialog from '../ConfimDialog'

const FriendList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [friends, setFriends] = useState([])
  // const [game, setGame] = useState(null)
  // const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the games collection
    // const unsubscribe = firebase.userGames(authUser).onSnapshot(snapshot => {
    //   setGames(snapshot.docs)
    // })
    // // Unsubscribe from listener when component is destroyed
    // return () => {
    //   unsubscribe()
    // }
  }, [authUser, firebase])
  // Return component
  return (
    <Card>
      <CardHeader title="Friends" />
      <CardContent>
        <List>
          {/* {friends.map(game => (
              <ListItem key={game.id}>
                <ListItemText primary={game.data().name} />
              </ListItem>
            ))} */}
        </List>
      </CardContent>
    </Card>
  )
}

export default FriendList
