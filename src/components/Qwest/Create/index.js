import firebase from 'firebase'
import classnames from 'classnames'
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, Panel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import Qwest from '../../../models/Qwest'
import './style.css'

class QwestCreate extends Component {
  constructor(props) {
    // Set props
    super(props)

    // Set state
    this.state = {
      title: ''
    }
  }

  createQwestSuccessCallback(data) {
    // Redirect to Qwest list route
    browserHistory.push('/qwest/list')
  }

  handleChange(event) {
    // Update state values
    this.setState({title: event.target.value})
  }

  handleFormSubmit(event) {
    // Stop the form submission from reloading the page
    event.preventDefault()

    // Create new Qwest object and save
    const newQwest = new Qwest({
      title: this.state.title
    })

    newQwest.create(this.createQwestSuccessCallback)
  }

  watchAuthState() {
    // Setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      }
    })
  }

  componentDidMount() {
    // Setup listeners
    this.watchAuthState()
  }

  render() {
    // Declare relevant properties as local variables
    const { className, ..._props } = this.props

    // Declare other local variables
    const panelHeader = (<h3>Create New Qwest</h3>)

    // Render the veiw
    return (
      <div className={classnames('QwestCreate', className)}>
        <div className="QwestCreate-content">
          <Panel header={panelHeader}>
            <Form horizontal onSubmit={(event) => this.handleFormSubmit(event)}>
              <FormGroup controlId="title">
                <Col componentClass={ControlLabel} sm={2}>Title</Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="What This Qwest will be Called"
                    onChange={(event) => this.handleChange(event)}
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
    )
  }
}

export default QwestCreate
