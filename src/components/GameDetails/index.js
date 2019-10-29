import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import QwestCreate from '../QwestCreate'
import QwestList from '../QwestList'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'

const GameDetailsPage = props => {
  // Load url params
  const { id } = useParams()
  // Load state
  const [game, setGame] = useState(null)
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the game collection object
    const unsubscribe = props.firebase.game(id).onSnapshot(snapshot => {
      setGame(snapshot.data())
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [id, props.firebase])
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          <Typography variant="h4" gutterBottom>
            Game
          </Typography>
          {game && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardHeader title="Details" />
                  <CardContent>
                    <Typography variant="body2">
                      <b>Name: </b> {game.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <QwestCreate firebase={props.firebase} authUser={authUser} />
              </Grid>
              <Grid item xs={12}>
                <QwestList firebase={props.firebase} authUser={authUser} />
              </Grid>
            </Grid>
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
