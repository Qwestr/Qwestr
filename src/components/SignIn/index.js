import React, { Component, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Sign in with Google
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user document
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        })
      })
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Sign in with Facebook
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user document
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        })
      })
      .then(() => {
        this.setState({ error: null })
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS
        }
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase)

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase)

const SignUpPage = props => {
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
            className={classes.submit}
            disabled={isInvalid}
          >
            Sign In
          </Button>
          {error && (
            <Grid container justify="flex-end">
              <Grid item>
                <Typography variant="body2" color="secondary">
                  {error.message}
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs>
              <PasswordForgetLink />
            </Grid>
            <Grid item>
              <SignUpLink />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default compose(
  withRouter,
  withFirebase,
)(SignUpPage)
