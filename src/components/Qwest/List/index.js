import firebase from 'firebase'
import classnames from 'classnames'
import graph from 'fbgraph'
import React, { Component } from 'react'
import {
  Badge, Button, ListGroup, ListGroupItem,
  Modal, Panel, Tab, Tabs
} from 'react-bootstrap'
import { browserHistory } from 'react-router'
import QwestManager from '../../../managers/Qwest'
import UserManager from '../../../managers/User'
import QwestItem from '../Item'
import QwestQwick from '../Qwick'
import './style.css'

class QwestList extends Component {
  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      activeTab: 'active',
      selectedQwestKey: null,
      showAssignQwestModal: false,
      qwestManager: new QwestManager(),
      userQwests: {},
      userManager: new UserManager(),
      user: {},
      friends: []
    }
  }

  handleTabSelect(value) {
    // update state values
    this.setState({activeTab: value})
  }

  getFacebookFriends() {
    // Get User data
    this.state.userManager.getUser(this.state.user, (data) => {
      // Set Facebook Graph access token
      let accessToken = data.val().credentials.Facebook.accessToken
      graph.setAccessToken(accessToken)
      // Get list of friends
      graph.get('me/friends', (err, res) => {
        // Update state values
        this.setState({friends: res.data})
      })
    })
  }

  assignQwestToUser(userData) {
    // Get SocialUser data
    this.state.userManager.getSocialUser(userData, (data) => {
      // Get User ID from the data
      const assignedUserId = data.val().uid

      // Assign the Qwest
      this.state.qwestManager.assign(this.state.selectedQwestKey, assignedUserId, (data) => {
        // close the Assign Qwest modal view
        this.closeAssignQwestModal()
      })
    })
  }

  getQwestListNavigation() {
    return (
      <Tabs id='Qwest-tabs' activeKey={this.state.activeTab} onSelect={(value) => this.handleTabSelect(value)}>
        <Tab eventKey='active' title="Active">
          <div className="QwestList-list">
            <QwestQwick />
            <ListGroup>
              {this.getActiveQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='assigned' title="Assigned">
          <div className="QwestList-list">
            <ListGroup>
              {this.getAssignedQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='completed' title="Completed">
          <div className="QwestList-list">
            <ListGroup>
              {this.getCompletedQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='pending' title={this.getPendingTabTitle()}>
          <div className="QwestList-list">
            <ListGroup>
              {this.getPendingQwestList()}
            </ListGroup>
          </div>
        </Tab>
      </Tabs>
    )
  }

  getPendingTabTitle() {
    if (this.state.userQwests.pending) {
      return (
        <div>
          Pending
          <Badge>{Object.keys(this.state.userQwests.pending).length}</Badge>
        </div>
      )
    } else {
      return (
        <div>Pending</div>
      )
    }
  }

  getAssignQwestModal() {
    return (
      <Modal show={this.state.showAssignQwestModal} onHide={() => this.closeAssignQwestModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Assign a Qwest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.getFriendsAssignList()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeAssignQwestModal()}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  getFriendsAssignList() {
    if (this.state.friends) {
      return this.state.friends.map((friend, index) =>
        <ListGroupItem key={index} onClick={() => this.assignQwestToUser(friend)}>
          {friend.name}
        </ListGroupItem>
      )
    } else {
      return null
    }
  }

  getActiveQwestList() {
    if (this.state.userQwests.active) {
      return Object.keys(this.state.userQwests.active).map((key) =>
        <QwestItem
          key={key}
          id={key}
          qwest={this.state.userQwests.active[key]}
          qwestManager={this.state.qwestManager}
          assignQwest={() => this.showAssignQwestModal(key)}
          active
        />
      )
    } else {
      return null
    }
  }

  getCompletedQwestList() {
    if (this.state.userQwests.completed) {
      return Object.keys(this.state.userQwests.completed).map((key) =>
        <QwestItem
          key={key}
          id={key}
          qwest={this.state.userQwests.completed[key]}
          qwestManager={this.state.qwestManager}
          completed
        />
      )
    } else {
      return null
    }
  }

  getAssignedQwestList() {
    if (this.state.userQwests.assigned) {
      return Object.keys(this.state.userQwests.assigned).map((key) =>
        <QwestItem
          key={key}
          id={key}
          qwest={this.state.userQwests.assigned[key]}
          qwestManager={this.state.qwestManager}
          assignQwest={() => this.showAssignQwestModal(key)}
          assigned
        />
      )
    } else {
      return null
    }
  }

  getPendingQwestList() {
    if (this.state.userQwests.pending) {
      return Object.keys(this.state.userQwests.pending).map((key) =>
        <QwestItem
          key={key}
          id={key}
          qwest={this.state.userQwests.pending[key]}
          qwestManager={this.state.qwestManager}
          pending
        />
      )
    } else {
      return null
    }
  }

  showAssignQwestModal(key) {
    // set the state
    this.setState({
      selectedQwestKey: key,
      showAssignQwestModal: true
    })

    // get list of friends from Facebook
    this.getFacebookFriends()
  }

  closeAssignQwestModal() {
    // set the state
    this.setState({showAssignQwestModal: false})
  }

  getAllUserQwestsCallback(data) {
    // set the state
    this.setState({userQwests: data})
  }

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      } else {
        // set the state
        this.setState({user: user})
        // Get User's list of Qwests
        this.state.qwestManager.getAllUserQwests((data) => {
          this.getAllUserQwestsCallback(data)
        })
      }
    })
  }

  componentDidMount() {
    // setup listeners
    this.watchAuthState()
  }

  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props

    // declare other local variables
    const panelHeader = (<h3>Qwests</h3>)

    // render the veiw
    return (
      <div className={classnames('QwestList', className)}>
        <div className="QwestList-content">
          <Panel header={panelHeader}>
            {this.getQwestListNavigation()}
          </Panel>
          {this.getAssignQwestModal()}
        </div>
      </div>
    )
  }
}

export default QwestList
