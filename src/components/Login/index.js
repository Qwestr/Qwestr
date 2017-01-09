import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import firebase from 'firebase';
import './style.css';

class Login extends Component {
  loginWithFacebook() {
    // Setup Firebase Facebook Auth Provider
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
    });
  }

  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('Login', className)}>
        <div className="Login-form">
          <Button bsStyle="primary" onClick={this.loginWithFacebook}>Login with Facebook</Button>
        </div>
      </div>
    );
  }
}

export default Login;
