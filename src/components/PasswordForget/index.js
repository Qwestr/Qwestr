import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'
import { SignInLink } from '../SignIn'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const PasswordForgetLink = () => (
  <Typography variant="body2">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </Typography>
)

const PasswordForgetPage = props => {
  // Load styles
  const classes = useStyles()
  // Load state
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  // Define methods
  const onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Reset password
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        // Push to the sign in route
        props.history.push(ROUTES.SIGN_IN)
      })
      .catch(error => {
        // Set error
        setError(error)
      })
  }
  // Return component
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h1">
          Qwestr
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={event => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={!email}
          >
            Reset
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <SignInLink />
            </Grid>
          </Grid>
          {error && (
            <Grid container justify="flex-end">
              <Grid item>
                <Typography variant="body2" color="secondary">
                  {error.message}
                </Typography>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </Container>
  )
}

export { PasswordForgetLink }

export default compose(
  withRouter,
  withFirebase,
)(PasswordForgetPage)
