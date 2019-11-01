import React, { useEffect, useState } from 'react'
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

const SentInviteList = props => {
  // Deconstruct properties
  const { authUser, firebase } = props
  // Load state
  const [games, setGames] = useState([])
  const [game, setGame] = useState(null)
  // Define effects handlers
  // useEffect(() => {
  //   // Setup listener to the games collection
  //   const unsubscribe = firebase.userGames(authUser).onSnapshot(snapshot => {
  //     setGames(snapshot.docs)
  //   })
  //   // Unsubscribe from listener when component is destroyed
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [authUser, firebase])
  // Return component
  return (
    <Card>
      <CardHeader title="Sent Invites" />
      <CardContent>
        {/* <List>
            {games.map(game => (
              <ListItem key={game.id}>
                <ListItemText primary={game.data().name} />
                <ListItemSecondaryAction>
                  <Grid container spacing={3}>
                    <Grid item>
                      <Link to={`${ROUTES.GAMES}/${game.id}`}>
                        <IconButton
                          color="primary"
                          edge="end"
                          aria-label="view"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="secondary"
                        edge="end"
                        aria-label="delete"
                        onClick={() => confirmGameDelete(game)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List> */}
      </CardContent>
    </Card>
  )
}

export default SentInviteList
