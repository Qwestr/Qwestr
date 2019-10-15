import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

import PasswordChangeForm from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'
import { AuthUserContext, withAuthorization } from '../Session'

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
      <div>
        Sign In Methods:
        <ul>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1
            const isEnabled = activeSignInMethods.includes(signInMethod.id)

            return (
              <li key={signInMethod.id}>
                {isEnabled ? (
                  <button
                    type="button"
                    onClick={() => this.onUnlink(signInMethod.id)}
                    disabled={onlyOneLeft}
                  >
                    Deactivate {signInMethod.id}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      this.onSocialLoginLink(signInMethod.provider)
                    }
                  >
                    Link {signInMethod.id}
                  </button>
                )}
              </li>
            )
          })}{' '}
        </ul>
        {error && error.message}
      </div>
    )
  }
}

const LoginManagement = withFirebase(LoginManagementBase)

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
        <LoginManagement authUser={authUser} />
      </div>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(AccountPage)
