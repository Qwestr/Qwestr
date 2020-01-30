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

import * as ROUTES from '../../constants/routes'
import ConfirmDialog from '../ConfirmDialog'
import GameEdit from '../GameEdit'
import QwestCreate from '../QwestCreate'
import { QwestList, CompletedQwestList } from '../QwestList'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'
import { GameInviteForm, GameInviteList } from './invite'
import PlayerList from './list'

const GameDetailsPage = props => {
  // Deconstruct properties
  const { firebase, history } = props
  // Load url params
  const { id } = useParams()
  // Load state
  const [game, setGame] = useState(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  // Define methods
  const viewPosts = () => {
    history.push(`${ROUTES.GAMES}/${id}/posts`)
  }

  const editGame = () => {
    setIsEditMode(true)
  }

  const handleGameEditClose = () => {
    setIsEditMode(false)
  }

  const confirmGameDelete = () => {
    // Open confirm dialog
    setIsConfirmDialogOpen(true)
  }

  const handleGameDelete = confirm => {
    if (confirm) {
      // Delete game
      firebase.deleteGame(game.id)
      // Push to the games page
      props.history.push(ROUTES.GAMES)
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
                {!isEditMode ? (
                  <Aux>
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
                            color="primary"
                            aria-label="view"
                            onClick={viewPosts}
                          >
                            Posts
                          </Button>
                          <Button
                            variant="contained"
                            color="default"
                            aria-label="view"
                            onClick={editGame}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            aria-label="delete"
                            onClick={confirmGameDelete}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <GameInviteForm
                        authUser={authUser}
                        firebase={firebase}
                        game={game}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <GameInviteList firebase={firebase} game={game} />
                    </Grid>
                    <Grid item xs={12}>
                      <PlayerList firebase={firebase} game={game} />
                    </Grid>
                    <Grid item xs={12}>
                      <QwestCreate
                        authUser={authUser}
                        firebase={firebase}
                        game={game}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <QwestList
                        authUser={authUser}
                        firebase={firebase}
                        game={game}
                        history={history}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CompletedQwestList
                        authUser={authUser}
                        firebase={firebase}
                        game={game}
                        history={history}
                      />
                    </Grid>
                  </Aux>
                ) : (
                  <Grid item xs={12}>
                    <GameEdit
                      firebase={firebase}
                      game={game}
                      close={handleGameEditClose}
                    ></GameEdit>
                  </Grid>
                )}
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

export { GameInviteForm, GameInviteList, PlayerList, GameDetailsPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GameDetailsPage)
