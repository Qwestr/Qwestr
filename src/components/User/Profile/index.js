import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import './style.css'

export default class UserProfile extends Component {
  render() {
    // declare local variables
    const panelHeader = (<h3>User Profile</h3>)

    // render the veiw
    return (
      <div className="UserProfile">
        <Panel header={panelHeader}>
        </Panel>
      </div>
    )
  }
}
