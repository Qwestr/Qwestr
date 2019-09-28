import firebase from 'firebase'
import React, { Component } from 'react'
import update from 'react-addons-update';
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Panel } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { REPEAT_TYPE } from '../../../models/Qwest'
import QwestManager from '../../../managers/Qwest'
import './style.css'

class QwestEdit extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      qwestId: React.PropTypes.string
    }),
    qwestManager: React.PropTypes.instanceOf(QwestManager)
  }

  static defaultProps = {
    params: {
      qwestId: 'defaultQwestId'
    },
    qwestManager: new QwestManager()
  }

  constructor(props) {
    // Set props
    super(props)

    // Set state
    this.state = {
      noQwestFound: false,
      isQwestLoaded: false,
      qwest: null,
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
      },
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
        value={this.state.repeats}
      >
        <option key="" value="">Never</option>
        {selectList}
      </FormControl>
    )
  }

  editQwestSuccessCallback(data) {
    // Redirect to Qwest list route
    browserHistory.push('/qwest/list')
  }

  handleChange(event) {
    // Update state values
    if (event.target.id === 'title') {
      this.setState({
        qwest: update(this.state.qwest, {
          title: {$set: event.target.value}
        }),
        title: event.target.value
      })
    } else if (event.target.id === 'description') {
      this.setState({
        qwest: update(this.state.qwest, {
          description: {$set: event.target.value}
        }),
        description: event.target.value
      })
    } else if (event.target.id === 'repeats') {
      this.setState({
        qwest: update(this.state.qwest, {
          repeats: {$set: event.target.value}
        }),
        repeats: event.target.value
      })
    }
  }

  validateForm() {
    if (!this.state.qwest.title) {
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
      // Update Qwest object
      this.props.qwestManager.update(this.props.params.qwestId, this.state.qwest, this.editQwestSuccessCallback)
    }
  }

  getQwestEditForm() {
    // Create paner header
    const panelHeader = (<h3>Edit Qwest</h3>)

    if (!this.state.noQwestFound) {
      if (this.state.isQwestLoaded) {
        return (
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
                    <Button type="submit">Update</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Panel>
          </div>
        )
      } else {
        return null
      }
    } else {
      return (
        <div className="qwest-not-found">
          <h1>
            <small>Qwest Not Found :(</small>
          </h1>
        </div>
      )
    }
  }

  getQwestData(qwestId) {
    // get Qwest data
    this.props.qwestManager.getQwest(qwestId, (data) => {
      if (!data.val()) {
        // Update state
        this.setState({noQwestFound: true})
      } else {
        // Get Qwest from returned data`
        const qwest = data.val()
        console.log('qwest', qwest);

        // Update state
        this.setState({
          qwest: qwest,
          title: qwest.title || '',
          description: qwest.description || '',
          repeats: qwest.repeats || '',
          isQwestLoaded: true
        })
      }
    })
  }

  watchAuthState() {
    // Setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // If User has not been authenticated, redirect to home
        browserHistory.push('/')
      } else {
        // Get Qwest data
        this.getQwestData(this.props.params.qwestId)
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
    return (
      <div className="QwestEdit">
        {this.getQwestEditForm()}
      </div>
    )
  }
}

export default QwestEdit
