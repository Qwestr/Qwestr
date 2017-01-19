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
  Panel
} from 'react-bootstrap';
import { getUser } from '../../../lib/user';
import { completeQwest, getUserQwests, getCompletedUserQwests } from '../../../lib/qwest';
import './style.css';

class QwestList extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      qwests: {}
    };

    // bind functions
    this.getFriendsList = this.getFriendsList.bind(this);
    this.getQwestList = this.getQwestList.bind(this);
    this.getUserQwestsSuccessCallback = this.getUserQwestsSuccessCallback.bind(this);
  }

  completeAndRemoveQwest(qwestData, key) {
    // complete the Qwest
    completeQwest(qwestData, key);

    // remove Qwest from state data and update state
    let newState = this.state
    delete newState.qwests[key];
    this.setState(newState);
  }

  getFriendsList() {
    // Get User data
    getUser(function(data) {
      // set Facebook Graph access token
      let accessToken = data.val().credentials.Facebook.accessToken;
      graph.setAccessToken(accessToken);

      // get list of friends
      graph.get('me/friends', function(err, res) {
        console.log(res);
      });
    });
  }

  getQwestList() {
    return Object.keys(this.state.qwests).map((key) =>
      <ListGroupItem key={key}>
        <div className="Qwest-item-content">
          {this.state.qwests[key].title}
            <ButtonGroup className="Qwest-item-button-group">
              <Button
                bsStyle="primary"
                onClick={() => this.completeAndRemoveQwest(this.state.qwests[key], key)}>
                Complete
              </Button>
              {/* <Button bsStyle="success" onClick={this.getFriendsList}>Assign</Button> */}
              <Button bsStyle="danger">Delete</Button>
            </ButtonGroup>
        </div>
      </ListGroupItem>
    );
  }

  getUserQwestsSuccessCallback(data) {
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
        getUserQwests(this.getUserQwestsSuccessCallback);
        // TODO: remove test of getCompletedUserQwests()
        getCompletedUserQwests();
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
            <ListGroup>
              {this.getQwestList()}
            </ListGroup>
          </Panel>
        </div>
      </div>
    );
  }
}

export default QwestList;
