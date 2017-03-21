import firebase from 'firebase'
import React, { Component } from 'react'
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Panel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
// import Qwest from '../../../models/Qwest'
import QwestManager from '../../../managers/Qwest'
import './style.css'

class QwestEdit extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      qwestId: React.PropTypes.string
    }),
    manager: React.PropTypes.instanceOf(QwestManager)
  }

  static defaultProps = {
    params: {
      qwestId: 'defaultQwestId'
    },
    manager: new QwestManager()
  }

  constructor(props) {
    // Set props
    super(props)

    // Set state
    this.state = {
      noQwestFound: false,
      qwest: {},
      validationState: {
        title: null,
        description: null
      },
      validationText: {
        title: null,
        description: null
      },
    }
  }

  editQwestSuccessCallback(data) {
    // Redirect to Qwest list route
    browserHistory.push('/qwest/list')
  }

  handleChange(event) {
    // Update state values
    if (event.target.id === 'title') {
      this.setState({title: event.target.value})
    } else if (event.target.id === 'description') {
      this.setState({description: event.target.value})
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
      // Update Qwest object and save
      // const newQwest = new Qwest({
      //   title: this.state.title,
      //   description: this.state.description
      // })

      // newQwest.create(this.createQwestSuccessCallback)
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
    // Declare local variables
    const panelHeader = (<h3>Edit Qwest</h3>)

    // Render the veiw
    return (
      <div className="QwestEdit">
        <div className="qwest-edit-content">
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
                    value={this.state.qwest.title}
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
                    value={this.state.qwest.description}
                  />
                  {this.getValidationText('description')}
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Update</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </div>
      </div>
    )
  }
}

export default QwestEdit
