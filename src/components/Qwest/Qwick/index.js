import React, { Component } from 'react'
import {
  Button, Col, ControlLabel, Form, FormControl, FormGroup,
  Grid, ListGroupItem, Row
} from 'react-bootstrap'
import './style.css'

export default class QwestQwick extends Component {
  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {}
  }

  render() {
    return (
      <ListGroupItem>
        QwestQwick
        <Grid>
          <Row>
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
              <FormGroup>
                <Col smOffset={2} sm={10}>
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
