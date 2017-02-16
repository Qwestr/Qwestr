import firebase from 'firebase'
import classnames from 'classnames'
import graph from 'fbgraph'
import React, { Component } from 'react'
import {
  Badge, Button, ButtonGroup, ListGroup, ListGroupItem,
  Modal, Panel, Tab, Tabs
} from 'react-bootstrap'
import { browserHistory } from 'react-router'
import Linkify from 'react-linkify'
import QwestManager from '../../../managers/Qwest'
import { getCurrentUserInfo, getUserInfo } from '../../../lib/user'
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
      showShareQwestModal: false,
      qwestManager: new QwestManager(),
      userQwests: {},
      friends: []
    }
  }

  handleTabSelect(value) {
    // update state values
    this.setState({activeTab: value})
  }

  getFacebookFriends() {
    // Get current User data
    getCurrentUserInfo((data) => {
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
    // Get User data
    getUserInfo(userData, (data) => {
      // Get User ID from the data
      const assignedUserId = data.val().userId

      // Assign the Qwest
      this.state.qwestManager.assign(this.state.selectedQwestKey, assignedUserId, (data) => {
        // close the Assign Qwest modal view
        this.closeAssignQwestModal()
      })
    })
  }

  shareQwestWithUser(userData) {
    // Get User data
    getUserInfo(userData, (data) => {
      // Get User ID from the data
      const sharingUserId = data.val().userId

      // Share the Qwest
      this.state.qwestManager.share(this.state.selectedQwestKey, sharingUserId, (data) => {
        // close the Share Qwest modal view
        this.closeShareQwestModal()
      })
    })
  }

  getQwestListNavigation() {
    return (
      <Tabs id='Qwest-tabs' activeKey={this.state.activeTab} onSelect={(value) => this.handleTabSelect(value)}>
        <Tab eventKey='active' title="Active">
          <div className="Qwest-list">
            <ListGroup>
              {this.getActiveQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='assigned' title="Assigned">
          <div className="Qwest-list">
            <ListGroup>
              {this.getAssignedQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='shared' title="Shared">
          <div className="Qwest-list">
            <ListGroup>
              {this.getSharedQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='completed' title="Completed">
          <div className="Qwest-list">
            <ListGroup>
              {this.getCompletedQwestList()}
            </ListGroup>
          </div>
        </Tab>
        <Tab eventKey='pending' title={this.getPendingTabTitle()}>
          <div className="Qwest-list">
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

  getShareQwestModal() {
    return (
      <Modal show={this.state.showShareQwestModal} onHide={() => this.closeShareQwestModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Share a Qwest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.getFriendsShareList()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.closeShareQwestModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
    )
  }

  getFriendsShareList() {
    if (this.state.friends) {
      return this.state.friends.map((friend, index) =>
        <ListGroupItem key={index} onClick={() => this.shareQwestWithUser(friend)}>
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
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.userQwests.active[key].title}
            </Linkify>
            {this.getActiveQwestButtonGroup(this.state.userQwests.active[key], key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getActiveQwestButtonGroup(qwest, key) {
    if (qwest.assignedBy) {
      return (
        <ButtonGroup className="Qwest-item-button-group">
          <Button
            bsStyle="primary"
            onClick={() => this.state.qwestManager.complete(key)}
          >
            Complete
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.state.qwestManager.dropAssigned(key)}
          >
            Drop
          </Button>
        </ButtonGroup>
      )
    } else {
      return (
        <ButtonGroup className="Qwest-item-button-group">
          <Button
            bsStyle="primary"
            onClick={() => this.state.qwestManager.complete(key)}
          >
            Complete
          </Button>
          <Button
            bsStyle="success"
            onClick={() => this.showAssignQwestModal(key)}
          >
            Assign
          </Button>
          <Button
            bsStyle="warning"
            onClick={() => this.showShareQwestModal(key)}
          >
            Share
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.state.qwestManager.delete(key)}
          >
            Delete
          </Button>
        </ButtonGroup>
      )
    }
  }

  getCompletedQwestList() {
    if (this.state.userQwests.completed) {
      return Object.keys(this.state.userQwests.completed).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.userQwests.completed[key].title}
            </Linkify>
            {this.getCompletedQwestButtonGroup(this.state.userQwests.completed[key], key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getCompletedQwestButtonGroup(qwest, key) {
    if (qwest.assignedBy) {
      return (
        <ButtonGroup className="Qwest-item-button-group">
          <Button
            bsStyle="primary"
            onClick={() => this.state.qwestManager.remove(key)}
          >
            Remove
          </Button>
        </ButtonGroup>
      )
    } else {
      return (
        <ButtonGroup className="Qwest-item-button-group">
          <Button
            bsStyle="primary"
            onClick={() => this.state.qwestManager.restart(key)}
          >
            Restart
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => this.state.qwestManager.delete(key)}
          >
            Delete
          </Button>
        </ButtonGroup>
      )
    }
  }

  getAssignedQwestList() {
    if (this.state.userQwests.assigned) {
      return Object.keys(this.state.userQwests.assigned).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.userQwests.assigned[key].title}
            </Linkify>
            {this.getAssignedQwestButtonGroup(key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getAssignedQwestButtonGroup(key) {
    return (
      <ButtonGroup className="Qwest-item-button-group">
        <Button
          bsStyle="success"
          onClick={() => this.showAssignQwestModal(key)}
        >
          Reassign
        </Button>
        <Button
          bsStyle="warning"
          onClick={() => this.state.qwestManager.revoke(key)}
        >
          Revoke
        </Button>
        <Button
          bsStyle="danger"
          onClick={() => this.state.qwestManager.delete(key)}
        >
          Delete
        </Button>
      </ButtonGroup>
    )
  }

  getSharedQwestList() {
    if (this.state.userQwests.shared) {
      return Object.keys(this.state.userQwests.shared).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.userQwests.shared[key].title}
            </Linkify>
            {this.getSharedQwestButtonGroup(key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getSharedQwestButtonGroup(key) {
    return (
      <ButtonGroup className="Qwest-item-button-group">
        <Button
          onClick={() => this.state.qwestManager.drop(key)}
        >
          Drop
        </Button>
      </ButtonGroup>
    )
  }

  getPendingQwestList() {
    if (this.state.userQwests.pending) {
      return Object.keys(this.state.userQwests.pending).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.userQwests.pending[key].title}
            </Linkify>
            {this.getPendingQwestButtonGroup(key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getPendingQwestButtonGroup(key) {
    return (
      <ButtonGroup className="Qwest-item-button-group">
        <Button
          bsStyle="primary"
          onClick={() => this.state.qwestManager.accept(key)}
        >
          Accept
        </Button>
        <Button
          bsStyle="danger"
          onClick={() => this.state.qwestManager.reject(key)}
        >
          Reject
        </Button>
      </ButtonGroup>
    )
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

  showShareQwestModal(key) {
    // set the state
    this.setState({
      selectedQwestKey: key,
      showShareQwestModal: true
    })

    // get list of friends from Facebook
    this.getFacebookFriends()
  }

  closeShareQwestModal() {
    // set the state
    this.setState({showShareQwestModal: false})
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
        // Else, get User's list of Qwests
        this.state.qwestManager.getAllUserQwests((data) => this.getAllUserQwestsCallback(data))
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
      <div className={classnames('Qwest', className)}>
        <div className="Qwest-content">
          <Panel header={panelHeader}>
            {this.getQwestListNavigation()}
          </Panel>
          {this.getAssignQwestModal()}
          {this.getShareQwestModal()}
        </div>
      </div>
    )
  }
}

export default QwestList
