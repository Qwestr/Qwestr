import firebase from 'firebase'
import classnames from 'classnames'
import React, { Component } from 'react'
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Panel
} from 'react-bootstrap'
import { browserHistory } from 'react-router'
import Qwest, { REPEAT_TYPE } from '../../../models/Qwest'
import './style.css'

class QwestCreate extends Component {
  constructor(props) {
    // Set props
    super(props)

    // Set state
    this.state = {
      title: '',
      description: '',
      repeats: '',
      validationState: {
        title: null,
        description: null
      },
      validationText: {
        title: null,
        description: null
      }
    }
  }

  getQwestRepeatSelects() {
    const selectList = Object.keys(REPEAT_TYPE).map((key) =>
      <option key={key} value={key}>{key}</option>
    )
    return (
      <FormControl
        componentClass="select"
        placeholder=""
        onChange={(event) => this.handleChange(event)}
      >
        <option key="" value="">Never</option>
        {selectList}
      </FormControl>
    )
  }

  createQwestSuccessCallback(data) {
    // Redirect to Qwest list route
    browserHistory.push('/qwest/list')
  }

  handleChange(event) {
    // Update state values
    if (event.target.id === 'title') {
      this.setState({title: event.target.value})
    } else if (event.target.id === 'description') {
      this.setState({description: event.target.value})
    } else if (event.target.id === 'repeats') {
      this.setState({repeats: event.target.value})
    }
  }

  validateForm() {
    if (!this.state.title) {
      // Update the state and return false
      let updatedValidationState = this.state.validationState
      updatedValidationState.title = 'error'

      let updatedValidationText = this.state.validationText
      updatedValidationText.title = 'A title is required.'

      this.setState({
        validationState: updatedValidationState,
        validationText: updatedValidationText
      })

      return false
    }

    return true
  }

  handleFormSubmit(event) {
    // Stop the form submission from reloading the page
    event.preventDefault()

    if (this.validateForm()) {
      // Create new Qwest object and save
      const newQwest = new Qwest({
        title: this.state.title,
        description: this.state.description,
        repeats: this.state.repeats
      })

      newQwest.create(this.createQwestSuccessCallback)
    }
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

  getValidationText(field) {
    if (this.state.validationText[field]) {
      return (
        <HelpBlock>{this.state.validationText[field]}</HelpBlock>
      )
    } else {
      return null
    }
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
              <FormGroup controlId="title" validationState={this.state.validationState.title}>
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="What this Qwest will be called"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.title}
                  />
                  {this.getValidationText('title')}
                </Col>
              </FormGroup>
              <FormGroup controlId="description" validationState={this.state.validationState.description}>
                <Col componentClass={ControlLabel} sm={2}>
                  Description
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="What this Qwest is all about"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.description}
                  />
                  {this.getValidationText('description')}
                </Col>
              </FormGroup>
              <FormGroup controlId="repeats">
                <Col componentClass={ControlLabel} sm={2}>
                  Repeats
                </Col>
                <Col sm={10}>
                  {this.getQwestRepeatSelects()}
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
