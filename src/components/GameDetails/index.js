import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import ConfirmDialog from '../ConfirmDialog'
import QwestCreate from '../QwestCreate'
import QwestList from '../QwestList'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'
import { GameInviteForm, GameInviteList } from './invite'
import PlayerList from './list'

const GameDetailsPage = props => {
  // Deconstruct properties
  const { firebase } = props
  // Load url params
  const { id } = useParams()
  // Load state
  const [game, setGame] = useState(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  // Define methods
  const confirmGameDelete = game => {
    // Set game
    setGame(game)
    // Open confirm dialog
    setIsConfirmDialogOpen(true)
  }

  const handleGameDelete = confirm => {
    if (confirm) {
      // Delete game
      firebase.deleteGame(game.id)
      // firebase.game(game.id).delete()
    }
    // Close confirm dialog
    setIsConfirmDialogOpen(false)
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the game collection object
    const unsubscribe = firebase.game(id).onSnapshot(snapshot => {
      setGame(snapshot)
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [id, firebase])
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          {game && (
            <Aux>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="Details" />
                    <CardContent>
                      <Typography variant="body1">
                        <b>Name: </b> {game.data().name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="secondary"
                        aria-label="delete"
                        onClick={() => confirmGameDelete(game)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <GameInviteForm
                    game={game}
                    firebase={firebase}
                    authUser={authUser}
                  />
                </Grid>
                <Grid item xs={12}>
                  <GameInviteList game={game} firebase={firebase} />
                </Grid>
                <Grid item xs={12}>
                  <PlayerList game={game} firebase={firebase} />
                </Grid>
                <Grid item xs={12}>
                  <QwestCreate
                    game={game}
                    firebase={firebase}
                    authUser={authUser}
                  />
                </Grid>
                <Grid item xs={12}>
                  <QwestList
                    game={game}
                    firebase={firebase}
                    authUser={authUser}
                  />
                </Grid>
              </Grid>
              <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                handleClose={handleGameDelete}
                title="Delete Game"
                message="Are you sure you want to delete this game?  This cannot be undone."
              />
            </Aux>
          )}
        </Aux>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GameDetailsPage)
