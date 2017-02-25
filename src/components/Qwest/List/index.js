import firebase from 'firebase'
import classnames from 'classnames'
import graph from 'fbgraph'
import React, { Component } from 'react'
import {
  Badge, Button, ButtonGroup, ListGroup, ListGroupItem,
  Modal, Panel, Tab, Tabs,
  Grid, Col, Row,
  DropdownButton, MenuItem
} from 'react-bootstrap'
import { browserHistory } from 'react-router'
import Linkify from 'react-linkify'
import QwestManager from '../../../managers/Qwest'
import UserManager from '../../../managers/User'
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
    // Get general User data
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
      console.log('data: ' + JSON.stringify(data.val()));
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

  getActiveQwestList() {
    if (this.state.userQwests.active) {
      return Object.keys(this.state.userQwests.active).map((key) =>
        <ListGroupItem key={key}>
          <Grid>
            <Row>
              <Col xs={10} sm={8}>
                <Linkify>
                  {this.state.userQwests.active[key].title}
                </Linkify>
              </Col>
              {this.getActiveQwestButtonGroup(this.state.userQwests.active[key], key)}
            </Row>
          </Grid>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getActiveQwestButtonGroup(qwest, key) {
    if (qwest.assignedBy) {
      return (
        <div className="Qwest-item-actions">
          <Col sm={4} xsHidden>
            <ButtonGroup>
              <Button
                bsStyle="primary"
                onClick={() => this.state.qwestManager.complete(key)}
              >
                Complete
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => this.state.qwestManager.drop(key)}
              >
                Drop
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={2} smHidden mdHidden lgHidden>
            <DropdownButton id="actions-dropdown" title="Actions">
              <MenuItem
                eventKey="1"
                onClick={() => this.state.qwestManager.complete(key)}
              >
                Complete
              </MenuItem>
              <MenuItem
                eventKey="2"
                onClick={() => this.state.qwestManager.drop(key)}
              >
                Drop
              </MenuItem>
            </DropdownButton>
          </Col>
        </div>
      )
    } else {
      return (
        <div className="Qwest-item-actions">
          <Col sm={4} xsHidden>
            <ButtonGroup>
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
                bsStyle="danger"
                onClick={() => this.state.qwestManager.delete(key)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={2} smHidden mdHidden lgHidden>
            <DropdownButton id="actions-dropdown" title="Actions">
              <MenuItem
                eventKey="1"
                onClick={() => this.state.qwestManager.complete(key)}
              >
                Complete
              </MenuItem>
              <MenuItem
                eventKey="2"
                onClick={() => this.showAssignQwestModal(key)}
              >
                Assign
              </MenuItem>
              <MenuItem
                eventKey="3"
                onClick={() => this.state.qwestManager.delete(key)}
              >
                Delete
              </MenuItem>
            </DropdownButton>
          </Col>
        </div>
      )
    }
  }

  getCompletedQwestList() {
    if (this.state.userQwests.completed) {
      return Object.keys(this.state.userQwests.completed).map((key) =>
        <ListGroupItem key={key}>
          <Grid>
            <Row>
              <Col xs={10} sm={8}>
                <Linkify>
                  {this.state.userQwests.completed[key].title}
                </Linkify>
              </Col>
              {this.getCompletedQwestButtonGroup(this.state.userQwests.completed[key], key)}
            </Row>
          </Grid>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getCompletedQwestButtonGroup(qwest, key) {
    if (qwest.assignedBy) {
      return (
        <div className="Qwest-item-actions">
          <Col sm={4} xsHidden>
            <ButtonGroup>
              <Button
                bsStyle="danger"
                onClick={() => this.state.qwestManager.remove(key)}
              >
                Remove
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={2} smHidden mdHidden lgHidden>
            <DropdownButton id="actions-dropdown" title="Actions">
              <MenuItem
                eventKey="1"
                onClick={() => this.state.qwestManager.remove(key)}
              >
                Remove
              </MenuItem>
            </DropdownButton>
          </Col>
        </div>
      )
    } else {
      return (
        <div className="Qwest-item-actions">
          <Col sm={4} xsHidden>
            <ButtonGroup>
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
          </Col>
          <Col xs={2} smHidden mdHidden lgHidden>
            <DropdownButton id="actions-dropdown" title="Actions">
              <MenuItem
                eventKey="1"
                onClick={() => this.state.qwestManager.restart(key)}
              >
                Restart
              </MenuItem>
              <MenuItem
                eventKey="2"
                onClick={() => this.state.qwestManager.delete(key)}
              >
                Delete
              </MenuItem>
            </DropdownButton>
          </Col>
        </div>
      )
    }
  }

  getAssignedQwestList() {
    if (this.state.userQwests.assigned) {
      return Object.keys(this.state.userQwests.assigned).map((key) =>
      <ListGroupItem key={key}>
        <Grid>
          <Row>
            <Col xs={10} sm={8}>
              <Linkify>
                {this.state.userQwests.assigned[key].title}
              </Linkify>
            </Col>
            {this.getAssignedQwestButtonGroup(key)}
          </Row>
        </Grid>
      </ListGroupItem>
      )
    } else {
      return
    }
  }

  getAssignedQwestButtonGroup(key) {
    return (
      <div className="Qwest-item-actions">
        <Col sm={4} xsHidden>
          <ButtonGroup>
            <Button
              bsStyle="primary"
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
        </Col>
        <Col xs={2} smHidden mdHidden lgHidden>
          <DropdownButton id="actions-dropdown" title="Actions">
            <MenuItem
              eventKey="1"
              onClick={() => this.showAssignQwestModal(key)}
            >
              Reassign
            </MenuItem>
            <MenuItem
              eventKey="2"
              onClick={() => this.state.qwestManager.revoke(key)}
            >
              Revoke
            </MenuItem>
            <MenuItem
              eventKey="3"
              onClick={() => this.state.qwestManager.delete(key)}
            >
              Delete
            </MenuItem>
          </DropdownButton>
        </Col>
      </div>
    )
  }

  getPendingQwestList() {
    if (this.state.userQwests.pending) {
      return Object.keys(this.state.userQwests.pending).map((key) =>
        <ListGroupItem key={key}>
          <Grid>
            <Row>
              <Col xs={10} sm={8}>
                <Linkify>
                  {this.state.userQwests.pending[key].title}
                </Linkify>
              </Col>
              {this.getPendingQwestButtonGroup(key)}
            </Row>
          </Grid>
        </ListGroupItem>
      )
    } else {
      return
    }
  }

  getPendingQwestButtonGroup(key) {
    return (
      <div className="Qwest-item-actions">
        <Col sm={4} xsHidden>
          <ButtonGroup>
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
        </Col>
        <Col xs={2} smHidden mdHidden lgHidden>
          <DropdownButton id="actions-dropdown" title="Actions">
            <MenuItem
              eventKey="1"
              onClick={() => this.state.qwestManager.accept(key)}
            >
              Accept
            </MenuItem>
            <MenuItem
              eventKey="2"
              onClick={() => this.state.qwestManager.reject(key)}
            >
              Reject
            </MenuItem>
          </DropdownButton>
        </Col>
      </div>
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
      <div className={classnames('Qwest', className)}>
        <div className="Qwest-content">
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
