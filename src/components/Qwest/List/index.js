import React, { Component } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { listUserQwests } from '../../../lib/qwest';
import './style.css';

class QwestList extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      qwestList: {}
    };

    // bind functions
    this.dataSuccessCallback = this.dataSuccessCallback.bind(this);
  }

  dataSuccessCallback(data) {
    // set the state
    this.setState({qwestList: data.val()});
  }

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      // get list of qwests
      listUserQwests(this.dataSuccessCallback);
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
              {Object.keys(this.state.qwestList).map(function(key) {
                return <ListGroupItem key={key}>{this.state.qwestList[key].title}</ListGroupItem>;
              }, this)}
            </ListGroup>
          </Panel>
        </div>
      </div>
    );
  }
}

export default QwestList;
