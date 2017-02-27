import React, { Component } from 'react'
import {
  Button, ButtonGroup, Col, DropdownButton,
  Grid, ListGroupItem, MenuItem, Row
} from 'react-bootstrap'
import QwestManager from '../../../managers/Qwest'
import './style.css'

class ActionButton extends Component {
  static propTypes = {
    action: React.PropTypes.shape({
      title: React.PropTypes.string,
      style: React.PropTypes.string,
      event: React.PropTypes.func
    })
  }

  static defaultProps = {
    action: {
      title: 'Action Name',
      style: 'success',
      event: () => {}
    }
  }

  render() {
    return (
      <Button bsStyle={this.props.action.style} onClick={this.props.action.event}>
        {this.props.action.title}
      </Button>
    )
  }
}

class ActionButtonGroup extends Component {
  static propTypes = {
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      style: React.PropTypes.string,
      event: React.PropTypes.func
    }))
  }

  static defaultProps = {
    actions: [{
      title: 'Action Name',
      style: 'success',
      event: () => {}
    }]
  }

  render() {
    // Setup action buttons
    const actionButtons = this.props.actions.map((action, index) =>
      <ActionButton key={index} action={action} />
    )

    return (
      <ButtonGroup>
        {actionButtons}
      </ButtonGroup>
    )
  }
}

class ActionButtonDropdown extends Component {
  static propTypes = {
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      event: React.PropTypes.func
    }))
  }

  static defaultProps = {
    actions: [{
      title: 'Action Name',
      event: () => {}
    }]
  }

  render() {
    // Setup action items
    const actionItems = this.props.actions.map((action, index) =>
      <MenuItem key={index} eventKey={index} title={action.title} />
    )

    return (
      <DropdownButton id="actionButtonDropdown" title="Actions">
        {actionItems}
      </DropdownButton>
    )
  }
}

class QwestItem extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    qwest: React.PropTypes.shape({
      title: React.PropTypes.string
    }),
    manager: React.PropTypes.instanceOf(QwestManager),
    assignFunction: React.PropTypes.func,
    active: React.PropTypes.bool
  }

  static defaultProps = {
    id: 'defaultQwestId',
    qwest: {
      title: 'Qwest Title'
    },
    manager: new QwestManager(),
    assignFunction: () => {},
    active: false
  }

  getActions() {
    if (this.props.active) {
      return [{
        title: 'Complete',
        style: 'primary',
        event: () => this.props.manager.complete(this.props.id)
      }, {
        title: 'Assign',
        style: 'success',
        event: this.props.assignFunction,
      }, {
        title: 'Delete',
        style: 'danger'
      }]
    }
  }

  render() {
    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col className='qwest-item-title' xs={9} sm={8}>
              {this.props.qwest.title}
            </Col>
            <Col className='action-button-group' sm={4} xsHidden>
              <ActionButtonGroup actions={this.getActions()}/>
            </Col>
            <Col className='action-button-dropdown' xs={3} smHidden mdHidden lgHidden>
              <ActionButtonDropdown actions={this.getActions()}/>
            </Col>
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}

export default QwestItem
