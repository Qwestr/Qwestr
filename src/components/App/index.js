import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import firebase from 'firebase';
import logo from './logo.svg';
import './style.css';

class App extends Component {
  loginWithFacebook() {
    // Setup Firebase Facebook Auth Provider
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log('LOGIN SUCCESS!');
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('token: ' + token);
      // The signed-in user info.
      var user = result.user;
      console.log('user: ' + user);
    }).catch(function(error) {
      console.log('LOGIN ERROR!');
      // Handle Errors here.
      var errorCode = error.code;
      console.log('errorCode: ' + errorCode);
      var errorMessage = error.message;
      console.log('errorMessage: ' + errorMessage);
      // The email of the user's account used.
      var email = error.email;
      console.log('email: ' + email);
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log('credential: ' + credential);
    });
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button bsStyle="primary" onClick={this.loginWithFacebook}>Login with Facebook</Button>
      </div>
    );
  }
}

export default App;
