import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'

const MARKETING_EMAILS_SIGN_UP_MESSAGE = `
  I want to receive inspiration and stay informed about updates via email.
`
const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use'

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this Email address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.
`

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignUpLink = () => (
  <Typography variant="body2">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </Typography>
)

const SignUpPage = props => {
  // Load styles
  const classes = useStyles()
  // Load state
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [allowExtraEmails, setAllowExtraEmails] = useState(false)
  const [error, setError] = useState(null)
  // Define methods
  const isInvalid = username === '' || email === '' || password === ''

  const handleSignup = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Sign up user
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user document
        return props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            allowExtraEmails,
          },
          { merge: true },
        )
      })
      .then(() => {
        // Send verification email
        return props.firebase.doSendEmailVerification()
      })
      .then(() => {
        // Push to the home route
        props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        // Set custom error message (if applicable)
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
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
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                onChange={event => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    onChange={event => setAllowExtraEmails(!allowExtraEmails)}
                  />
                }
                label={MARKETING_EMAILS_SIGN_UP_MESSAGE}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isInvalid}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2">
                Already have an account?{' '}
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </Typography>
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

export { SignUpLink }

export default compose(
  withRouter,
  withFirebase,
)(SignUpPage)
