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
import { getUserQwests } from '../../../lib/qwest';
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
    this.getQwestList = this.getQwestList.bind(this);
    this.dataSuccessCallback = this.dataSuccessCallback.bind(this);
  }

  getQwestList() {
    return Object.keys(this.state.qwests).map((key) =>
      <ListGroupItem key={key}>
        <div className="Qwest-item-content">
          {this.state.qwests[key].title}
            <ButtonGroup className="Qwest-item-button-group">
              <Button bsStyle="primary">Complete</Button>
              <Button bsStyle="success">Assign</Button>
              <Button bsStyle="danger">Delete</Button>
            </ButtonGroup>
        </div>
      </ListGroupItem>
    );
  }

  getFriendsList() {
    let accessToken = 'EAACEdEose0cBAFnQwhsqp8Qa8ZAZAXuZBl9rsybtySMDjCtwhqF3VtYAULrrMpsIKEbMi3TvSGXy2WfJ6lWMCZAA2S5cy1ZC5PvsnT334rnIEs9ycIQZBunWZBWjZB1EvzXHWjhgZC4Rq6vdZA8d4bTvr495Ah66nj4l75CAQtgfhVSwZDZD';
    graph.setAccessToken(accessToken);

    graph.get('me/friends?limit=50', function(err, res) {
      console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
    });
  }

  dataSuccessCallback(data) {
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
        getUserQwests(this.dataSuccessCallback);
      }
    });
  }

  componentDidMount() {
    console.log('test getFriendsList()..');
    this.getFriendsList();
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
