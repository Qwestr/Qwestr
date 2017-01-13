import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import classnames from 'classnames';
import firebase from 'firebase';
import './style.css';

class QwestList extends Component {
  listQwests() {
    // Get current user id
    const userId = firebase.auth().currentUser.uid;

    // Create Qwest object.
    const qwestData = {
      title: this.state.title
    };

    // Get a key for a new Qwest.
    var newQwestKey = firebase.database().ref().child('qwests').push().key;

    // Write the new Qwest's data simultaneously
    // in the Qwests list and the user's Qwest list.
    let updates = {};
    updates['/qwests/' + newQwestKey] = qwestData;
    updates['/user-qwests/' + userId + '/' + newQwestKey] = qwestData;

    // update the database
    return firebase.database().ref().update(updates);
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
              <ListGroupItem>Qwest 1</ListGroupItem>
              <ListGroupItem>Qwest 2</ListGroupItem>
              <ListGroupItem>Qwest 3</ListGroupItem>
            </ListGroup>
          </Panel>
        </div>
      </div>
    );
  }
}

export default QwestList;
