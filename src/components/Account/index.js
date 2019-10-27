import React, { Component, useState } from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { withFirebase } from '../Firebase'
import PasswordChangeForm from '../PasswordChange'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    description: 'Password',
    provider: null,
  },
  {
    id: 'google.com',
    description: 'Google',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    description: 'Facebook',
    provider: 'facebookProvider',
  },
]

const DefaultLoginToggle = props => {
  // Deconstruct properties
  const { onlyOneLeft, isEnabled, signInMethod, onUnlink } = props
  // Load state
  const [password, setPassword] = useState('')

  const onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Link email/ password login
    props.onLink(password)
    // Clear state
    setPassword('')
  }

  return isEnabled ? (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PasswordChangeForm />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onUnlink(signInMethod.id)}
          disabled={onlyOneLeft}
        >
          Disable {signInMethod.id}
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Card>
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            name="password"
            type="password"
            label="New Password"
            fullWidth
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!password}
          >
            Enable {signInMethod.description}
          </Button>
        </CardActions>
      </form>
    </Card>
  )
  // }
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) =>
  isEnabled ? (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Disable {signInMethod.description}
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={() => onLink(signInMethod.provider)}
    >
      Enable {signInMethod.description}
    </Button>
  )

class LoginManagementBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeSignInMethods: [],
      error: null,
    }
  }

  componentDidMount() {
    this.fetchSignInMethods()
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null }),
      )
      .catch(error => this.setState({ error }))
  }

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password,
    )
    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }))
  }

  render() {
    const { activeSignInMethods, error } = this.state

    return (
      <Card>
        <CardHeader title="Sign In Methods" />
        <CardContent>
          <Grid container spacing={3}>
            {SIGN_IN_METHODS.map(signInMethod => {
              const onlyOneLeft = activeSignInMethods.length === 1
              const isEnabled = activeSignInMethods.includes(signInMethod.id)

              return (
                <Grid item xs={12} key={signInMethod.id}>
                  {signInMethod.id === 'password' ? (
                    <DefaultLoginToggle
                      onlyOneLeft={onlyOneLeft}
                      isEnabled={isEnabled}
                      signInMethod={signInMethod}
                      onLink={this.onDefaultLoginLink}
                      onUnlink={this.onUnlink}
                    />
                  ) : (
                    <SocialLoginToggle
                      onlyOneLeft={onlyOneLeft}
                      isEnabled={isEnabled}
                      signInMethod={signInMethod}
                      onLink={this.onSocialLoginLink}
                      onUnlink={this.onUnlink}
                    />
                  )}
                </Grid>
              )
            })}
          </Grid>
          {error && error.message}
        </CardContent>
      </Card>
    )
  }
}

const LoginManagement = withFirebase(LoginManagementBase)

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Aux>
        <Typography variant="h4" gutterBottom>
          Account
        </Typography>
        <LoginManagement authUser={authUser} />
      </Aux>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage)
