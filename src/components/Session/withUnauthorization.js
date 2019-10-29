import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'
import AuthUserContext from './context'

const withUnauthorization = Component => {
  class WithUnauthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (authUser) {
            this.props.history.push(ROUTES.HOME)
          }
        },
        () => this.props.history.push(ROUTES.HOME),
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (!authUser ? <Component {...this.props} /> : null)}
        </AuthUserContext.Consumer>
      )
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithUnauthorization)
}

export default withUnauthorization
