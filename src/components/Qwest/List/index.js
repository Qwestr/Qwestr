import firebase from 'firebase'
import classnames from 'classnames'
import graph from 'fbgraph'
import React, { Component } from 'react'
import { Badge, Button, ButtonGroup, ListGroup, ListGroupItem, Modal, Panel, Tab, Tabs } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import Linkify from 'react-linkify'
import {
  completeQwest,
  // restartQwest,
  // assignQwest,
  shareQwest,
  acceptQwest,
  rejectQwest,
  revokeQwest,
  dropQwest,
  removeQwest,
  deleteQwest
  // getUserQwests
} from '../../../lib/qwest'
import { getCurrentUserInfo, getUserInfo } from '../../../lib/user'
import UserQwestList from '../../../models/UserQwestList'
import './style.css'

class QwestList extends Component {
  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      activeTab: 'active',
      currentQwestKey: null,
      currentQwestData: null,
      showAssignQwestModal: false,
      showShareQwestModal: false,
      qwests: new UserQwestList(),
      friends: []
    }

    // bind functions
    this.handleTabSelect = this.handleTabSelect.bind(this)
    this.getFacebookFriends = this.getFacebookFriends.bind(this)
    this.getActiveQwestList = this.getActiveQwestList.bind(this)
    this.getCompletedQwestList = this.getCompletedQwestList.bind(this)
    this.getAssignedQwestList = this.getAssignedQwestList.bind(this)
    this.getSharedQwestList = this.getSharedQwestList.bind(this)
    this.getPendingQwestList = this.getPendingQwestList.bind(this)
    // this.getUserQwestsCallback = this.getUserQwestsCallback.bind(this)
    this.getAssignQwestModal = this.getAssignQwestModal.bind(this)
    this.getFriendsAssignList = this.getFriendsAssignList.bind(this)
    this.showAssignQwestModal = this.showAssignQwestModal.bind(this)
    this.closeAssignQwestModal = this.closeAssignQwestModal.bind(this)
    this.assignQwestCallback = this.assignQwestCallback.bind(this)
    this.getShareQwestModal = this.getShareQwestModal.bind(this)
    this.getFriendsShareList = this.getFriendsShareList.bind(this)
    this.showShareQwestModal = this.showShareQwestModal.bind(this)
    this.closeShareQwestModal = this.closeShareQwestModal.bind(this)
    this.shareQwestCallback = this.shareQwestCallback.bind(this)
  }

  handleTabSelect(value) {
    // update state values
    this.setState({activeTab: value})
  }

  getFacebookFriends() {
    // Get current User data
    getCurrentUserInfo((data) => {
      // set Facebook Graph access token
      let accessToken = data.val().credentials.Facebook.accessToken
      graph.setAccessToken(accessToken)

      // get list of friends
      graph.get('me/friends', (err, res) => {
        // update state values
        this.setState({friends: res.data})
      })
    })
  }

  assignQwestToUser(userData) {
    // Get User data
    getUserInfo(userData, (data) => {
      // get user ID from data
      const assignedUserId = data.val().userId

      // assign Qwest
      this.state.qwests.assign(this.state.currentQwestKey, assignedUserId, this.assignQwestCallback)
    })
  }

  assignQwestCallback(data) {
    // close the Assign Qwest modal view
    this.closeAssignQwestModal()
  }

  shareQwestWithUser(userData) {
    // Get User data
    getUserInfo(userData, (data) => {
      // get user ID from data
      const sharingUserId = data.val().userId

      // assign Qwest
      shareQwest(
        this.state.currentQwestData,
        this.state.currentQwestKey,
        sharingUserId,
        this.shareQwestCallback
      )
    })
  }

  shareQwestCallback(data) {
    // close the Share Qwest modal view
    this.closeShareQwestModal()
  }

  getQwestListNavigation() {
    return (
      <Tabs id='Qwest-tabs' activeKey={this.state.activeTab} onSelect={this.handleTabSelect}>
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
    if (this.state.qwests && this.state.qwests.pending) {
      return (
        <div>
          Pending
          <Badge>{Object.keys(this.state.qwests.pending).length}</Badge>
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
      <Modal show={this.state.showAssignQwestModal} onHide={this.closeAssignQwestModal}>
          <Modal.Header closeButton>
            <Modal.Title>Assign a Qwest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.getFriendsAssignList()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeAssignQwestModal}>Close</Button>
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
      <Modal show={this.state.showShareQwestModal} onHide={this.closeShareQwestModal}>
          <Modal.Header closeButton>
            <Modal.Title>Share a Qwest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.getFriendsShareList()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeShareQwestModal}>Close</Button>
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
    if (this.state.qwests && this.state.qwests.active) {
      return Object.keys(this.state.qwests.active).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.qwests.active[key].title}
            </Linkify>
            {this.getActiveQwestButtonGroup(this.state.qwests.active[key], key)}
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
            onClick={() => completeQwest(qwest, key)}
          >
            Complete
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => dropQwest(qwest, key)}
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
            onClick={() => this.state.qwests.complete(key)}
          >
            Complete
          </Button>
          <Button
            bsStyle="success"
            onClick={() => this.showAssignQwestModal(qwest, key)}
          >
            Assign
          </Button>
          <Button
            bsStyle="warning"
            onClick={() => this.showShareQwestModal(qwest, key)}
          >
            Share
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => deleteQwest(qwest, key)}
          >
            Delete
          </Button>
        </ButtonGroup>
      )
    }
  }

  getCompletedQwestList() {
    if (this.state.qwests && this.state.qwests.completed) {
      return Object.keys(this.state.qwests.completed).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.qwests.completed[key].title}
            </Linkify>
            {this.getCompletedQwestButtonGroup(this.state.qwests.completed[key], key)}
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
            onClick={() => removeQwest(key)}
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
            onClick={() => this.state.qwests.restart(key)}
          >
            Restart
          </Button>
          <Button
            bsStyle="danger"
            onClick={() => deleteQwest(qwest, key)}
          >
            Delete
          </Button>
        </ButtonGroup>
      )
    }
  }

  getAssignedQwestList() {
    if (this.state.qwests && this.state.qwests.assigned) {
      return Object.keys(this.state.qwests.assigned).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.qwests.assigned[key].title}
            </Linkify>
            {this.getAssignedQwestButtonGroup(this.state.qwests.assigned[key], key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getAssignedQwestButtonGroup(qwest, key) {
    return (
      <ButtonGroup className="Qwest-item-button-group">
        <Button
          bsStyle="success"
          onClick={() => this.showAssignQwestModal(qwest, key)}
        >
          Reassign
        </Button>
        <Button
          bsStyle="warning"
          onClick={() => revokeQwest(qwest, key)}
        >
          Revoke
        </Button>
        <Button
          bsStyle="danger"
          onClick={() => deleteQwest(qwest, key)}
        >
          Delete
        </Button>
      </ButtonGroup>
    )
  }

  getSharedQwestList() {
    if (this.state.qwests && this.state.qwests.shared) {
      return Object.keys(this.state.qwests.shared).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.qwests.shared[key].title}
            </Linkify>
            {this.getSharedQwestButtonGroup(this.state.qwests.shared[key], key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getSharedQwestButtonGroup(qwest, key) {
    return (
      <ButtonGroup className="Qwest-item-button-group">
        <Button
          onClick={() => dropQwest(qwest, key)}
        >
          Drop
        </Button>
      </ButtonGroup>
    )
  }

  getPendingQwestList() {
    if (this.state.qwests && this.state.qwests.pending) {
      return Object.keys(this.state.qwests.pending).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            <Linkify>
              {this.state.qwests.pending[key].title}
            </Linkify>
            {this.getPendingQwestButtonGroup(this.state.qwests.pending[key], key)}
          </div>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getPendingQwestButtonGroup(qwest, key) {
    return (
      <ButtonGroup className="Qwest-item-button-group">
        <Button
          bsStyle="primary"
          onClick={() => acceptQwest(qwest, key)}
        >
          Accept
        </Button>
        <Button
          bsStyle="danger"
          onClick={() => rejectQwest(qwest, key)}
        >
          Reject
        </Button>
      </ButtonGroup>
    )
  }

  showAssignQwestModal(qwestData, key) {
    // set the state
    this.setState({
      currentQwestKey: key,
      currentQwestData: qwestData,
      showAssignQwestModal: true
    })

    // get list of friends from Facebook
    this.getFacebookFriends()
  }

  closeAssignQwestModal() {
    // set the state
    this.setState({showAssignQwestModal: false})
  }

  showShareQwestModal(qwestData, key) {
    // set the state
    this.setState({
      currentQwestKey: key,
      currentQwestData: qwestData,
      showShareQwestModal: true
    })

    // get list of friends from Facebook
    this.getFacebookFriends()
  }

  closeShareQwestModal() {
    // set the state
    this.setState({showShareQwestModal: false})
  }

  getQwestListCallback(data) {
    // set the state
    this.setState({qwests: data})
  }

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      } else {
        // Else, get User's list of Qwests
        this.state.qwests.getAll((data) => this.getQwestListCallback(data))
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
