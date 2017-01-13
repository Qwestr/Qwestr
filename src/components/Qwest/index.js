import React, { Component } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Panel
} from 'react-bootstrap';
import classnames from 'classnames';
import firebase from 'firebase';
import './style.css';

class Qwest extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      title: ''
    };

    // bind functions
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  createQwest() {
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

  handleChange(event) {
    // update state values
    this.setState({title: event.target.value});
  }

  handleFormSubmit(event) {
    // stop the form submission from reloading the page
    event.preventDefault();

    // create the Qwest
    this.createQwest();
  }

  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // declare other local variables
    const panelHeader = (
      <div className="Qwest-panel-header">
        Create New Qwest
      </div>
    );

    // render the veiw
    return (
      <div className={classnames('Qwest', className)}>
        <div className="Qwest-form">
          <Panel header={panelHeader} bsStyle="info">
            <Form horizontal onSubmit={this.handleFormSubmit}>
              <FormGroup controlId="title">
                <Col componentClass={ControlLabel} sm={2}>Title</Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="What This Qwest will be Called"
                    onChange={this.handleChange}
                    value={this.state.title}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Create</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Qwest;
