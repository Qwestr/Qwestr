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
import QwestCreate from '../QwestCreate'
import { QwestList, CompletedQwestList } from '../QwestList'

const QwestsPage = props => {
  // Deconstruct properties
  const { firebase, history } = props
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          <Typography variant="h4" gutterBottom>
            Qwests
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <QwestCreate authUser={authUser} firebase={firebase} />
            </Grid>
            <Grid item xs={12}>
              <QwestList
                authUser={authUser}
                firebase={firebase}
                history={history}
              />
            </Grid>
            <Grid item xs={12}>
              <CompletedQwestList
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

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(QwestsPage)
