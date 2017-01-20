import React, { Component } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
// import graph from 'fbgraph';
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
// import { getUser } from '../../../lib/user';
import './style.css';

class QwestList extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      activeTab: 'active',
      showAssignQwestModal: false,
      qwests: {}
    };

    // bind functions
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.getFriendsList = this.getFriendsList.bind(this);
    this.getActiveQwestList = this.getActiveQwestList.bind(this);
    this.getCompletedQwestList = this.getCompletedQwestList.bind(this);
    this.getUserQwestsCallback = this.getUserQwestsCallback.bind(this);
    this.getAssignQwestModal = this.getAssignQwestModal.bind(this);
    this.closeAssignQwestModal = this.closeAssignQwestModal.bind(this);
  }

  handleTabSelect(value) {
    // update state values
    this.setState({activeTab: value});
  }

  getFriendsList() {
    // update state values
    this.setState({showAssignQwestModal: true});
    // Get User data
    // getUser(function(data) {
    //   // set Facebook Graph access token
    //   let accessToken = data.val().credentials.Facebook.accessToken;
    //   graph.setAccessToken(accessToken);
    //
    //   // get list of friends
    //   graph.get('me/friends', function(err, res) {
    //     console.log(res);
    //   });
    // });
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
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeAssignQwestModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
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
                <Button bsStyle="success" onClick={this.getFriendsList}>Assign</Button>
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
