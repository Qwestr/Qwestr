import firebase from 'firebase'
import React, { Component } from 'react'
import { Col, Grid, Image, Panel, Row } from 'react-bootstrap'
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

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      // set the state
      this.setState({user: user})
    })
  }

  componentDidMount() {
    // setup listeners
    this.watchAuthState()
  }

  getUserImage(user) {
    if (user.photoURL) {
      return (
        <Image className="user-profile-image" src={user.photoURL} responsive circle />
      )
    } else {
      return null
    }
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
                  {this.state.user.displayName}
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    )
  }
}