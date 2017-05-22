import React, { Component } from 'react'
import {
  Button, Col, Form, FormControl, FormGroup,
  Grid, HelpBlock, ListGroupItem, Row
} from 'react-bootstrap'
import Qwest from '../../../models/Qwest'
import './style.css'

export default class QwestQwick extends Component {
  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      title: '',
      validationState: {
        title: null,
      },
      validationText: {
        title: null,
      }
    }
  }

  createQwestSuccessCallback() {
    // Clear form fields
    this.resetForm()
  }

  handleChange(event) {
    // Update state values
    if (event.target.id === 'title') {
      this.setState({title: event.target.value})
    }
  }

  resetForm() {
    // Clear form fields
    this.setState({
      title: '',
      validationState: {
        title: null,
      },
      validationText: {
        title: null,
      }
    })
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
        title: this.state.title
      })

      newQwest.create(() => this.createQwestSuccessCallback())
    }
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
      <ListGroupItem>
        <div className="qwest-qwick-header">
          Create a Qwest
        </div>
        <Grid>
          <Row>
            <Form horizontal onSubmit={(event) => this.handleFormSubmit(event)}>
              <FormGroup controlId="title" validationState={this.state.validationState.title}>
                <Col sm={12}>
                  <FormControl
                    type="text"
                    placeholder="What this Qwest will be called"
                    onChange={(event) => this.handleChange(event)}
                    value={this.state.title}
                  />
                  {this.getValidationText('title')}
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={12}>
                  <Button type="submit">Create</Button>
                </Col>
              </FormGroup>
            </Form>
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}
