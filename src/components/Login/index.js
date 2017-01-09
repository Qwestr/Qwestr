import React, { Component } from 'react';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap';
import classnames from 'classnames';
import firebase from 'firebase';
import './style.css';

class Login extends Component {
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
    const { className, ..._props } = this.props;
    const formPanelTitle = (
      <h3>Create New Qwest</h3>
    );

    return (
      <div className={classnames('Login', className)}>
        <div className="App-header">
          <h2>Welcome to Qwestr</h2>
        </div>
        <div className="App-login">
          <Button bsStyle="primary" onClick={this.loginWithFacebook}>Login with Facebook</Button>
        </div>
        <div className="App-form">
          <Panel header={formPanelTitle} bsStyle="info">
            <Form horizontal onSubmit={this.handleFormSubmit}>
              <FormGroup controlId="title">
                <Col componentClass={ControlLabel} sm={2}>Title</Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="What This Qwest will be Called"
                    onChange={this.handleChange}
                    value={this.state.title}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Create</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Login;
