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
import QwestList from '../QwestList'

const QwestsPage = props => {
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
              <QwestCreate firebase={props.firebase} authUser={authUser} />
            </Grid>
            <Grid item xs={12}>
              <QwestList firebase={props.firebase} authUser={authUser} />
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
