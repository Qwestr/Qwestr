import React, { Component } from 'react'
import {
  Button, ButtonGroup, Col, DropdownButton,
  Grid, ListGroupItem, MenuItem, Row
} from 'react-bootstrap'
import { BasicUser } from '../../../models/User'
import QwestManager from '../../../managers/Qwest'
import UserManager from '../../../managers/User'
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
      assignedTo: React.PropTypes.string,
      title: React.PropTypes.string,
    }),
    qwestManager: React.PropTypes.instanceOf(QwestManager),
    userManager: React.PropTypes.instanceOf(UserManager),
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
    qwestManager: new QwestManager(),
    userManager: new UserManager(),
    assignQwest: () => {},
    active: false,
    completed: false,
    assigned: false,
    pending: false
  }

  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      userDetails: null
    }
  }

  getActions() {
    if (this.props.active) {
      if (this.props.qwest.assignedBy) {
        return [{
          title: 'Complete',
          style: 'primary',
          event: () => this.props.qwestManager.complete(this.props.id)
        }, {
          title: 'Drop',
          style: 'danger',
          event: () => this.props.qwestManager.drop(this.props.id)
        }]
      } else {
        return [{
          title: 'Complete',
          style: 'primary',
          event: () => this.props.qwestManager.complete(this.props.id)
        }, {
          title: 'Assign',
          style: 'success',
          event: this.props.assignQwest
        }, {
          title: 'Delete',
          style: 'danger',
          event: () => this.props.qwestManager.delete(this.props.id)
        }]
      }
    } else if (this.props.completed) {
      if (this.props.qwest.assignedBy) {
        return []
      } else {
        return [{
          title: 'Restart',
          style: 'primary',
          event: () => this.props.qwestManager.restart(this.props.id)
        }, {
          title: 'Delete',
          style: 'danger',
          event: () => this.props.qwestManager.delete(this.props.id)
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
        event: () => this.props.qwestManager.revoke(this.props.id)
      }, {
        title: 'Delete',
        style: 'danger',
        event: () => this.props.qwestManager.delete(this.props.id)
      }]
    } else if (this.props.pending) {
      return [{
        title: 'Accept',
        style: 'primary',
        event: () => this.props.qwestManager.accept(this.props.id)
      }, {
        title: 'Reject',
        style: 'danger',
        event: () => this.props.qwestManager.reject(this.props.id)
      }]
    } else {
      return []
    }
  }

  getBasicUserInfo(qwest) {
    let userId = null

    if (qwest.assignedTo) {
      userId = qwest.assignedTo
    } else if (qwest.assignedBy) {
      userId = qwest.assignedBy
    }

    if (userId) {
      const userData = {
        uid: userId
      }

      this.props.userManager.getUser(userData, (data) => {
        // create BasicUser object from returned data
        const userDetails = new BasicUser(data.val())
        userDetails.uid = userId

        // Update the state
        this.setState({userDetails: userDetails})
      })
    }
  }

  getUserDetails() {
    if (this.state.userDetails) {
      // Setup User label
      let userLabel = null
      if (this.props.qwest.assignedTo) {
        userLabel = 'Assigned To: '
      } else {
        userLabel = 'Assigned By: '
      }

      // Setup User link
      const userLink = '/user/' + this.state.userDetails.uid + '/details'

      // Setup User Name
      let userName = 'Qwestr User'
      if (this.state.userDetails.displayName) {
        userName = this.state.userDetails.displayName
      }

      return (
        <div className='qwest-item-user-details'>
          {userLabel} <a href={userLink}>{userName}</a>
        </div>
      )
    } else {
      return null
    }
  }

  componentDidMount() {
    // Get basic User assigned/ assigning information
    this.getBasicUserInfo(this.props.qwest)
  }

  render() {
    // create link for qwest
    const qwestLink = '/qwest/' + this.props.id + '/details'

    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col className='qwest-item-info' xs={9} sm={8}>
              <a className='qwest-item-title' href={qwestLink}>
                {this.props.qwest.title}
              </a>
              {this.getUserDetails()}
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
