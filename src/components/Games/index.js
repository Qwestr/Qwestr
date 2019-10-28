import React from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'
import GameCreate from './create'
// import QwestList from './list'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}))

const GamesPage = props => {
  // Load styles
  const classes = useStyles()
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
              <Paper className={classes.paper}>
                <GameCreate firebase={props.firebase} authUser={authUser} />
              </Paper>
            </Grid>
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <QwestList firebase={props.firebase} authUser={authUser} />
              </Paper>
            </Grid> */}
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
)(GamesPage)
