import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import classnames from 'classnames';
import { AUTH_PROVIDER, login } from '../../lib/auth';
import './style.css';

class Login extends Component {
  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // declare other local variables
    const panelHeader = (
      <div className="Login-panel-header">
        Login
      </div>
    );

    // render the veiw
    return (
      <div className={classnames('Login', className)}>
        <div className="Login-panel">
          <Panel header={panelHeader} bsStyle="info">
            <div className="Login-button">
              <Button
                block
                bsStyle="primary"
                bsSize="large"
                onClick={() => login(AUTH_PROVIDER.FACEBOOK)}
              >
                Login with Facebook
              </Button>
            </div>
            <div className="Login-button">
              <Button
                block
                bsStyle="success"
                bsSize="large"
                onClick={() => login(AUTH_PROVIDER.GOOGLE)}
              >
                Login with Google
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Login;
