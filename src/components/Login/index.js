import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
import { createUser } from '../../lib/user';
import { startFirebaseUI } from '../../helpers/Auth';
import './style.css';

class Login extends Component {
  constructor(props) {
    // set props
    super(props);

    // bind functions
    this.createUserSuccessCallback = this.createUserSuccessCallback.bind(this);
    this.signInSuccessCallback = this.signInSuccessCallback.bind(this);
  }

  createUserSuccessCallback() {
    // Redirect to home
    browserHistory.push('/');
  }

  signInSuccessCallback(currentUser, credential, redirectUrl) {
    // create the User
    createUser(currentUser, credential, this.createUserSuccessCallback);

    // do NOT redirect, otherwise createUser() db write will fail
    return false;
  }

  componentDidMount() {
    // start FirebaseUI
    startFirebaseUI('#firebaseui-auth-container', this.signInSuccessCallback);
  }

  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // declare other local variables
    const panelHeader = (<h3>Login</h3>);

    // render the veiw
    return (
      <div className={classnames('Login', className)}>
        <div className="Login-content">
          <Panel header={panelHeader}>
            <div id="firebaseui-auth-container"></div>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Login;
