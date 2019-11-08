import React from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'
import GameCreate from './create'
import GameList from './list'
import { GameInviteList } from './invite'

const GamesPage = props => {
  // Deconstruct properties
  const { firebase, history } = props
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          <Typography variant="h4" gutterBottom>
            Games
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <GameCreate authUser={authUser} firebase={firebase} />
            </Grid>
            <Grid item xs={12}>
              <GameInviteList authUser={authUser} firebase={firebase} />
            </Grid>
            <Grid item xs={12}>
              <GameList
                authUser={authUser}
                firebase={firebase}
                history={history}
              />
            </Grid>
          </Grid>
        </Aux>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export { GamesPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GamesPage)
