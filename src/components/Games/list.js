import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
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

import * as ROUTES from '../../constants/routes'

const GameList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [games, setGames] = useState([])
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the user's games collection
    const unsubscribe = firebase
      .userGames(authUser.uid)
      .onSnapshot(snapshot => {
        setGames(snapshot.docs)
      })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase])
  // Return component
  return (
    <Aux>
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
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Aux>
  )
}

export default GameList
