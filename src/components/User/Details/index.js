import firebase from 'firebase'
import React, { Component } from 'react'
import { Col, Grid, Image, Panel, Row } from 'react-bootstrap'
import './style.css'

export default class UserDetails extends Component {
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

  render() {
    // declare local variables
    const panelHeader = (<h3>User Details</h3>)

    // render the veiw
    return (
      <div className="UserDetails">
        <Panel header={panelHeader}>
          <Grid>
            <Row>
              <Col xs={3}>
                <Image className="user-details-image" src={this.state.user.photoURL} responsive circle />
              </Col>
              <Col xs={9}>
                <div className="user-details-name">
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
