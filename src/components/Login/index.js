import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { startFirebaseUI } from '../../lib/auth';
import './style.css';

class Login extends Component {
  componentDidMount() {
    // start FirebaseUI
    startFirebaseUI('#firebaseui-auth-container');
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
