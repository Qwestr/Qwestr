import React, { Component } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
import graph from 'fbgraph';
import { browserHistory } from 'react-router';
import {
  Button,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  Panel,
  Tab,
  Tabs
} from 'react-bootstrap';
import {
  getUserQwests,
  completeQwest,
  restartQwest,
  deleteQwest
} from '../../../lib/qwest';
import { getCurrentUserInfo, getUserInfo } from '../../../lib/user';
import './style.css';

class QwestList extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      activeTab: 'active',
      currentQwestKey: null,
      showAssignQwestModal: false,
      friends: [],
      qwests: {}
    };

    // bind functions
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.getFriendsList = this.getFriendsList.bind(this);
    this.getFacebookFriends = this.getFacebookFriends.bind(this);
    this.getActiveQwestList = this.getActiveQwestList.bind(this);
    this.getCompletedQwestList = this.getCompletedQwestList.bind(this);
    this.getUserQwestsCallback = this.getUserQwestsCallback.bind(this);
    this.getAssignQwestModal = this.getAssignQwestModal.bind(this);
    this.closeAssignQwestModal = this.closeAssignQwestModal.bind(this);
    this.showAssignQwestModal = this.showAssignQwestModal.bind(this)
  }

  handleTabSelect(value) {
    // update state values
    this.setState({activeTab: value});
  }

  getFacebookFriends() {
    // Get current User data
    getCurrentUserInfo((data) => {
      // set Facebook Graph access token
      let accessToken = data.val().credentials.Facebook.accessToken;
      graph.setAccessToken(accessToken);

      // get list of friends
      graph.get('me/friends', (err, res) => {
        // update state values
        this.setState({friends: res.data});
      });
    });
  }

  assignQwestToUser(userData) {
    // Get User data
    getUserInfo(userData, (data) => {
      console.log('assignQwestToUser() successfull!');
    });
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
        <Tab eventKey='completed' title="Completed">
          <div className="Qwest-list">
            <ListGroup>
              {this.getCompletedQwestList()}
            </ListGroup>
          </div>
        </Tab>
      </Tabs>
    );
  }

  getAssignQwestModal() {
    return (
      <Modal show={this.state.showAssignQwestModal} onHide={this.closeAssignQwestModal}>
          <Modal.Header closeButton>
            <Modal.Title>Assign a Qwest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.getFriendsList()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeAssignQwestModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }

  getFriendsList() {
    if (this.state.friends) {
      return this.state.friends.map((friend, index) =>
        <ListGroupItem key={index} onClick={() => this.assignQwestToUser(friend)}>
          {friend.name}
        </ListGroupItem>
      );
    } else {
      return null;
    }
  }

  getActiveQwestList() {
    if (this.state.qwests && this.state.qwests.active) {
      return Object.keys(this.state.qwests.active).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            {this.state.qwests.active[key].title}
              <ButtonGroup className="Qwest-item-button-group">
                <Button
                  bsStyle="primary"
                  onClick={() => completeQwest(this.state.qwests.active[key], key)}
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
                  onClick={() => deleteQwest(key)}
                >
                  Delete
                </Button>
              </ButtonGroup>
          </div>
        </ListGroupItem>
      );
    } else {
      return;
    }
  }

  getCompletedQwestList() {
    if (this.state.qwests && this.state.qwests.completed) {
      return Object.keys(this.state.qwests.completed).map((key) =>
        <ListGroupItem key={key}>
          <div className="Qwest-item-content">
            {this.state.qwests.completed[key].title}
              <ButtonGroup className="Qwest-item-button-group">
                <Button
                  bsStyle="primary"
                  onClick={() => restartQwest(this.state.qwests.completed[key], key)}
                >
                  Restart
                </Button>
                <Button
                  bsStyle="danger"
                  onClick={() => deleteQwest(key)}
                >
                  Delete
                </Button>
              </ButtonGroup>
          </div>
        </ListGroupItem>
      );
    } else {
      return;
    }
  }

  showAssignQwestModal(qwestKey) {
    // set the state
    this.setState({
      currentQwestKey: qwestKey,
      showAssignQwestModal: true
    });
    // get list of friends from Facebook
    this.getFacebookFriends();
  }

  closeAssignQwestModal() {
    // set the state
    this.setState({showAssignQwestModal: false});
  }

  getUserQwestsCallback(data) {
    // set the state
    this.setState({qwests: data.val()});
  }

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/');
      } else {
        // Else, get User's list of Qwests
        getUserQwests(this.getUserQwestsCallback);
      }
    });
  }

  componentDidMount() {
    // setup listeners
    this.watchAuthState();
  }

  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // declare other local variables
    const panelHeader = (<h3>Qwests</h3>);

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
    );
  }
}

export default QwestList;
