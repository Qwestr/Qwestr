import React, { Component } from 'react'
import {
  Button, ButtonGroup, Col, DropdownButton,
  Grid, ListGroupItem, MenuItem, Row
} from 'react-bootstrap'
import QwestManager from '../../../managers/Qwest'
import './style.css'

export class ActionButton extends Component {
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

export class ActionButtonGroup extends Component {
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

export class ActionButtonDropdown extends Component {
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
      <MenuItem key={index} eventKey={index} onClick={action.event}>
        {action.title}
      </MenuItem>
    )

    return (
      <DropdownButton id="actionButtonDropdown" title="Actions" pullRight>
        {actionItems}
      </DropdownButton>
    )
  }
}

export default class QwestItem extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    qwest: React.PropTypes.shape({
      assignedBy: React.PropTypes.string,
      title: React.PropTypes.string,
    }),
    manager: React.PropTypes.instanceOf(QwestManager),
    assignQwest: React.PropTypes.func,
    active: React.PropTypes.bool,
    completed: React.PropTypes.bool,
    assigned: React.PropTypes.bool,
    pending: React.PropTypes.bool
  }

  static defaultProps = {
    id: 'defaultQwestId',
    qwest: {
      title: 'Qwest Title'
    },
    manager: new QwestManager(),
    assignQwest: () => {},
    active: false,
    completed: false,
    assigned: false,
    pending: false
  }

  getActions() {
    if (this.props.active) {
      if (this.props.qwest.assignedBy) {
        return [{
          title: 'Complete',
          style: 'primary',
          event: () => this.props.manager.complete(this.props.id)
        }, {
          title: 'Drop',
          style: 'danger',
          event: () => this.props.manager.drop(this.props.id)
        }]
      } else {
        return [{
          title: 'Complete',
          style: 'primary',
          event: () => this.props.manager.complete(this.props.id)
        }, {
          title: 'Assign',
          style: 'success',
          event: this.props.assignQwest
        }, {
          title: 'Delete',
          style: 'danger',
          event: () => this.props.manager.delete(this.props.id)
        }]
      }
    } else if (this.props.completed) {
      if (this.props.qwest.assignedBy) {
        return [{
          title: 'Remove',
          style: 'danger',
          event: () => this.props.manager.remove(this.props.id)
        }]
      } else {
        return [{
          title: 'Restart',
          style: 'primary',
          event: () => this.props.manager.restart(this.props.id)
        }, {
          title: 'Delete',
          style: 'danger',
          event: () => this.props.manager.delete(this.props.id)
        }]
      }
    } else if (this.props.assigned) {
      return [{
        title: 'Reassign',
        style: 'primary',
        event: this.props.assignQwest
      }, {
        title: 'Revoke',
        style: 'warning',
        event: () => this.props.manager.revoke(this.props.id)
      }, {
        title: 'Delete',
        style: 'danger',
        event: () => this.props.manager.delete(this.props.id)
      }]
    } else if (this.props.pending) {
      return [{
        title: 'Accept',
        style: 'primary',
        event: () => this.props.manager.accept(this.props.id)
      }, {
        title: 'Reject',
        style: 'danger',
        event: () => this.props.manager.reject(this.props.id)
      }]
    } else {
      return []
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
