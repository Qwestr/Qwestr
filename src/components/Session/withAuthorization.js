import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'
import AuthUserContext from './context'

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.props.firebase
            .user(authUser.uid)
            .get()
            .then(snapshot => {
              // Get user document from snapshot data
              const user = snapshot.data()
              // Default empty roles
              if (!user.roles) {
                user.roles = {}
              }
              // Merge auth and user document
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                ...user,
              }
              if (!condition(authUser)) {
                this.props.history.push(ROUTES.SIGN_IN)
              }
            })
        } else {
          this.props.history.push(ROUTES.SIGN_IN)
        }
      })
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization)
}

export default withAuthorization
