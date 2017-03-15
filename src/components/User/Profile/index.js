import firebase from 'firebase'
import React, { Component } from 'react'
import { Col, Grid, Glyphicon, Image, Panel, Row } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import './style.css'

export default class UserProfile extends Component {
  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      user: {}
    }
  }

  getUserImage(user) {
    if (user.photoURL) {
      return (
        <Image className="user-profile-image" src={user.photoURL} responsive circle />
      )
    } else {
      return (
        <Glyphicon className="user-profile-default-image" glyph="user" />
      )
    }
  }

  getDisplayName(user) {
    if (user.displayName) {
      return user.displayName
    } else {
      return 'Qwestr User'
    }
  }

  watchAuthState() {
    // Setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      } else {
        // Set the state
        this.setState({user: user})
      }
    })
  }

  componentDidMount() {
    // setup listeners
    this.watchAuthState()
  }

  render() {
    // declare local variables
    const panelHeader = (<h3>User Profile</h3>)

    // render the veiw
    return (
      <div className="UserProfile">
        <Panel header={panelHeader}>
          <Grid>
            <Row>
              <Col xs={3}>
                {this.getUserImage(this.state.user)}
              </Col>
              <Col xs={9}>
                <div className="user-profile-name">
                  {this.getDisplayName(this.state.user)}
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    )
  }
}
