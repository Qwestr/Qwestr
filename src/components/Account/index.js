import React, { Component } from 'react'

import PasswordChangeForm from '../PasswordChange'
import { PasswordForgetForm } from '../PasswordForget'
import { AuthUserContext, withAuthorization } from '../Session'

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google',
    provider: 'googleProvider',
  },
  {
    id: 'facebook',
    provider: 'facebookProvider',
  },
]

class LoginManagement extends Component {
  render() {
    return (
      <div>
        Sign In Methods:
        <ul>
          {SIGN_IN_METHODS.map(signInMethod => {
            return (
              <li key={signInMethod.id}>
                <button type="button" onClick={() => {}}>
                  {signInMethod.id}
                </button>
              </li>
            )
          })}{' '}
        </ul>
      </div>
    )
  }
}

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
