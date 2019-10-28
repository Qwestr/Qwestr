import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'
import { PasswordForgetLink } from '../PasswordForget'
import { SignUpLink } from '../SignUp'

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential'

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an Email address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
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
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
  },
  socialButton: {
    margin: theme.spacing(0, 0, 2),
  },
}))

const SignInLink = () => (
  <Typography variant="body2">
    Just remembered it? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </Typography>
)

const SignInPage = props => {
  // Load styles
  const classes = useStyles()
  // Load state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  // Define methods
  const isInvalid = email === '' || password === ''

  const handleSignInEmail = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Sign in user
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
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

  const signInGoogle = () => {
    // Sign in with Google
    props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user document
        return props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
        })
      })
      .then(() => {
        // Push to home page
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

  const signInFacebook = () => {
    // Sign in with Facebook
    props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user document
        return props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
        })
      })
      .then(() => {
        // Push to home page
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
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignInEmail}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={isInvalid}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            className={classes.socialButton}
            onClick={signInGoogle}
          >
            Sign In with Google
          </Button>
          <Button
            fullWidth
            variant="contained"
            className={classes.socialButton}
            onClick={signInFacebook}
          >
            Sign In with Facebook
          </Button>
          <Grid container>
            <Grid item xs>
              <PasswordForgetLink />
            </Grid>
            <Grid item>
              <SignUpLink />
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

export { SignInLink }

export default compose(
  withRouter,
  withFirebase,
)(SignInPage)
