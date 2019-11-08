import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import UserManager from '../../managers/User'
import { startFirebaseUI } from '../../helpers/Auth'
import './style.css'

class Login extends Component {
  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      userManager: new UserManager()
    }
  }

  signInSuccessCallback(userData, credentials, redirectUrl) {
    // Create or update the User
    this.state.userManager.createUser(userData, credentials, () => {
      // Redirect to home
      browserHistory.push('/')
    })
  }

  componentDidMount() {
    // start FirebaseUI
    startFirebaseUI('#firebaseui-auth-container', (userData, credentials, redirectUrl) => {
      this.signInSuccessCallback(userData, credentials, redirectUrl)
    })
  }

  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props

    // declare other local variables
    const panelHeader = (<h3>Login</h3>)

    // render the veiw
    return (
      <div className={classnames('Login', className)}>
        <div className="Login-content">
          <Panel header={panelHeader}>
            <div id="firebaseui-auth-container"></div>
          </Panel>
        </div>
      </div>
    )
  }
}

export default Login
