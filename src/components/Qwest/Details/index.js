import firebase from 'firebase'
import classnames from 'classnames'
import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
// import Qwest from '../../../models/Qwest'
import './style.css'

class QwestDetails extends Component {
  // constructor(props) {
  //   // Set props
  //   super(props)
  //
  //   // Set state
  //   this.state = {
  //     title: ''
  //   }
  // }

  watchAuthState() {
    // Setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      }
    })
  }

  componentDidMount() {
    // Setup listeners
    this.watchAuthState()
  }

  render() {
    // Declare relevant properties as local variables
    const { className, ..._props } = this.props

    // Declare other local variables
    const panelHeader = (<h3>Qwest Details</h3>)

    // Render the veiw
    return (
      <div className={classnames('QwestDetails', className)}>
        <div className="QwestDetails-content">
          <Panel header={panelHeader}>
          </Panel>
        </div>
      </div>
    )
  }
}

export default QwestDetails
