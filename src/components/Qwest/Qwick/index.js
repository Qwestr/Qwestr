import React, { Component } from 'react'
import { Col, Grid, ListGroupItem, Row } from 'react-bootstrap'
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
            <Col className='qwest-item-info' xs={9} sm={8}>
            </Col>
            <Col className='action-button-group' sm={4} xsHidden>
            </Col>
            <Col className='action-button-dropdown' xs={3} smHidden mdHidden lgHidden>
            </Col>
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}
