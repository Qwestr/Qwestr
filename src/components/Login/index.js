import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import { login } from '../../lib/auth';
import './style.css';

class Login extends Component {
  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('Login', className)}>
        <div className="Login-form">
          <Button bsStyle="primary" onClick={login}>Login with Facebook</Button>
        </div>
      </div>
    );
  }
}

export default Login;
