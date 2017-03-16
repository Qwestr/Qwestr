import firebase from 'firebase'
import React, { Component } from 'react'
import { Col, ControlLabel, Grid, Row, Panel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import QwestManager from '../../../managers/Qwest'
import './style.css'

class QwestDetails extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      qwestId: React.PropTypes.string
    }),
    manager: React.PropTypes.instanceOf(QwestManager)
  }

  static defaultProps = {
    params: {
      qwestId: 'defaultQwestId'
    },
    manager: new QwestManager()
  }

  constructor(props) {
    // Set props
    super(props)

    // Set state
    this.state = {
      noQwestFound: false,
      qwest: {}
    }
  }

  getQwestTitle(qwest) {
    if (qwest.title) {
      return (
        <Row>
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <div className="qwest-details-title">
              {qwest.title}
            </div>
          </Col>
        </Row>
      )
    } else {
      return null
    }
  }

  getQwestDescription(qwest) {
    if (qwest.description) {
      return (
        <Row>
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <div className="qwest-details-description">
              {qwest.description}
            </div>
          </Col>
        </Row>
      )
    } else {
      return null
    }
  }

  getQwestDetails() {
    // Create paner header
    const panelHeader = (<h3>Qwest Details</h3>)

    if (!this.state.noQwestFound) {
      return (
        <Panel className="qwest-details-content" header={panelHeader}>
          <Grid>
            {this.getQwestTitle(this.state.qwest)}
            {this.getQwestDescription(this.state.qwest)}
          </Grid>
        </Panel>
      )
    } else {
      return (
        <div className="qwest-not-found">
          <h1>
            <small>Qwest Not Found :(</small>
          </h1>
        </div>
      )
    }
  }

  getQwestData(qwestId) {
    // get Qwest data
    this.props.manager.getQwest(qwestId, (data) => {
      if (!data.val()) {
        // Update state
        this.setState({noQwestFound: true})
      } else {
        // Update state
        this.setState({qwest: data.val()})
      }
    })
  }

  watchAuthState() {
    // Setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      } else {
        // Get Qwest data
        this.getQwestData(this.props.params.qwestId)
      }
    })
  }

  componentDidMount() {
    // Setup listeners
    this.watchAuthState()
  }

  render() {
    return (
      <div className="QwestDetails">
        {this.getQwestDetails()}
      </div>
    )
  }
}

export default QwestDetails
