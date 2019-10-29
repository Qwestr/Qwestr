import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'

import * as ROUTES from '../../constants/routes'

const GameList = props => {
  // Load state
  const [games, setGames] = useState([])
  // Define methods
  const handleGameDelete = id => {
    // Delete game
    props.firebase.game(id).delete()
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the games collection
    const unsubscribe = props.firebase
      .userGames(props.authUser)
      .onSnapshot(snapshot => {
        setGames(snapshot.docs)
      })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [props.authUser, props.firebase])
  // Return component
  return (
    <Card>
      <CardHeader title="Games" />
      <CardContent>
        <List>
          {games.map(game => (
            <ListItem key={game.id}>
              <ListItemText primary={game.data().name} />
              <ListItemSecondaryAction>
                <Link to={`${ROUTES.GAMES}/${game.id}`}>
                  <IconButton color="primary" edge="end" aria-label="view">
                    <VisibilityIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleGameDelete(game.id)}
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

export default GameList
