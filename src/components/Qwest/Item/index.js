// import classnames from 'classnames'
import React, { Component } from 'react'
import {
  Button, ButtonGroup, Col, DropdownButton,
  Grid, ListGroupItem, MenuItem, Row
} from 'react-bootstrap'

class ActionButton extends Component {
  static propTypes = {
    title: React.PropTypes.string
  }

  static defaultProps = {
    title: 'Action Title'
  }

  render() {
    return (
      <Button>
        {this.props.title}
      </Button>
    )
  }
}

class ActionButtonGroup extends Component {
  static propTypes = {
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string
    }))
  }

  static defaultProps = {
    actions: [{
      title: 'Action Name'
    }]
  }

  render() {
    // Setup action buttons
    const actionButtons = this.props.actions.map((action, index) =>
      <ActionButton key={index} title={action.title} />
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
      title: React.PropTypes.string
    }))
  }

  static defaultProps = {
    actions: [{
      title: 'Action Name'
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
    title: React.PropTypes.string,
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string
    }))
  }

  static defaultProps = {
    title: 'Qwest Title',
    actions: [{
      title: 'Action Name'
    }]
  }

  render() {
    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col xs={10} sm={8}>
              {this.props.title}
            </Col>
            <Col sm={4} xsHidden>
              <ActionButtonGroup actions={this.props.actions}/>
            </Col>
            <Col xs={2} smHidden mdHidden lgHidden>
              <ActionButtonDropdown actions={this.props.actions}/>
            </Col>
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}

export default QwestItem

// class QwestItem extends Component {
//   constructor(props) {
//     // set props
//     super(props)
//
//     // set state
//     this.state = {
//       activeTab: 'active',
//       selectedQwestKey: null,
//       showAssignQwestModal: false,
//       qwestManager: new QwestManager(),
//       userQwests: {},
//       userManager: new UserManager(),
//       user: {},
//       friends: []
//     }
//   }
//
//   render() {
//     // declare relevant properties as local variables
//     const { className, ..._props } = this.props
//
//     // declare other local variables
//     // const panelHeader = (<h3>Qwests</h3>)
//
//     // render the veiw
//     return (
//       <div className={classnames('QwestItem', className)}>
//         <div className="QwestItem-content">
//
//         </div>
//       </div>
//     )
//   }
// }
//
// export default QwestItem


// getActiveQwestList() {
//   if (this.state.userQwests.active) {
//     return Object.keys(this.state.userQwests.active).map((key) =>
//       <ListGroupItem key={key}>
//         <Grid>
//           <Row>
//             <Col xs={10} sm={8}>
//               <Linkify>
//                 {this.state.userQwests.active[key].title}
//               </Linkify>
//             </Col>
//             {this.getActiveQwestButtonGroup(this.state.userQwests.active[key], key)}
//           </Row>
//         </Grid>
//       </ListGroupItem>
//     )
//   } else {
//     return
//   }
// }
//
// getActiveQwestButtonGroup(qwest, key) {
//   if (qwest.assignedBy) {
//     return (
//       <div className="Qwest-item-actions">
//         <Col sm={4} xsHidden>
//           <ButtonGroup>
//             <Button
//               bsStyle="primary"
//               onClick={() => this.state.qwestManager.complete(key)}
//             >
//               Complete
//             </Button>
//             <Button
//               bsStyle="danger"
//               onClick={() => this.state.qwestManager.drop(key)}
//             >
//               Drop
//             </Button>
//           </ButtonGroup>
//         </Col>
//         <Col xs={2} smHidden mdHidden lgHidden>
//           <DropdownButton id="actions-dropdown" title="Actions">
//             <MenuItem
//               eventKey="1"
//               onClick={() => this.state.qwestManager.complete(key)}
//             >
//               Complete
//             </MenuItem>
//             <MenuItem
//               eventKey="2"
//               onClick={() => this.state.qwestManager.drop(key)}
//             >
//               Drop
//             </MenuItem>
//           </DropdownButton>
//         </Col>
//       </div>
//     )
//   } else {
//     return (
//       <div className="Qwest-item-actions">
//         <Col sm={4} xsHidden>
//           <ButtonGroup>
//             <Button
//               bsStyle="primary"
//               onClick={() => this.state.qwestManager.complete(key)}
//             >
//               Complete
//             </Button>
//             <Button
//               bsStyle="success"
//               onClick={() => this.showAssignQwestModal(key)}
//             >
//               Assign
//             </Button>
//             <Button
//               bsStyle="danger"
//               onClick={() => this.state.qwestManager.delete(key)}
//             >
//               Delete
//             </Button>
//           </ButtonGroup>
//         </Col>
//         <Col xs={2} smHidden mdHidden lgHidden>
//           <DropdownButton id="actions-dropdown" title="Actions">
//             <MenuItem
//               eventKey="1"
//               onClick={() => this.state.qwestManager.complete(key)}
//             >
//               Complete
//             </MenuItem>
//             <MenuItem
//               eventKey="2"
//               onClick={() => this.showAssignQwestModal(key)}
//             >
//               Assign
//             </MenuItem>
//             <MenuItem
//               eventKey="3"
//               onClick={() => this.state.qwestManager.delete(key)}
//             >
//               Delete
//             </MenuItem>
//           </DropdownButton>
//         </Col>
//       </div>
//     )
//   }
// }
//
// getCompletedQwestList() {
//   if (this.state.userQwests.completed) {
//     return Object.keys(this.state.userQwests.completed).map((key) =>
//       <ListGroupItem key={key}>
//         <Grid>
//           <Row>
//             <Col xs={10} sm={8}>
//               <Linkify>
//                 {this.state.userQwests.completed[key].title}
//               </Linkify>
//             </Col>
//             {this.getCompletedQwestButtonGroup(this.state.userQwests.completed[key], key)}
//           </Row>
//         </Grid>
//       </ListGroupItem>
//     )
//   } else {
//     return
//   }
// }
//
// getCompletedQwestButtonGroup(qwest, key) {
//   if (qwest.assignedBy) {
//     return (
//       <div className="Qwest-item-actions">
//         <Col sm={4} xsHidden>
//           <ButtonGroup>
//             <Button
//               bsStyle="danger"
//               onClick={() => this.state.qwestManager.remove(key)}
//             >
//               Remove
//             </Button>
//           </ButtonGroup>
//         </Col>
//         <Col xs={2} smHidden mdHidden lgHidden>
//           <DropdownButton id="actions-dropdown" title="Actions">
//             <MenuItem
//               eventKey="1"
//               onClick={() => this.state.qwestManager.remove(key)}
//             >
//               Remove
//             </MenuItem>
//           </DropdownButton>
//         </Col>
//       </div>
//     )
//   } else {
//     return (
//       <div className="Qwest-item-actions">
//         <Col sm={4} xsHidden>
//           <ButtonGroup>
//             <Button
//               bsStyle="primary"
//               onClick={() => this.state.qwestManager.restart(key)}
//             >
//               Restart
//             </Button>
//             <Button
//               bsStyle="danger"
//               onClick={() => this.state.qwestManager.delete(key)}
//             >
//               Delete
//             </Button>
//           </ButtonGroup>
//         </Col>
//         <Col xs={2} smHidden mdHidden lgHidden>
//           <DropdownButton id="actions-dropdown" title="Actions">
//             <MenuItem
//               eventKey="1"
//               onClick={() => this.state.qwestManager.restart(key)}
//             >
//               Restart
//             </MenuItem>
//             <MenuItem
//               eventKey="2"
//               onClick={() => this.state.qwestManager.delete(key)}
//             >
//               Delete
//             </MenuItem>
//           </DropdownButton>
//         </Col>
//       </div>
//     )
//   }
// }
//
// getAssignedQwestList() {
//   if (this.state.userQwests.assigned) {
//     return Object.keys(this.state.userQwests.assigned).map((key) =>
//     <ListGroupItem key={key}>
//       <Grid>
//         <Row>
//           <Col xs={10} sm={8}>
//             <Linkify>
//               {this.state.userQwests.assigned[key].title}
//             </Linkify>
//           </Col>
//           {this.getAssignedQwestButtonGroup(key)}
//         </Row>
//       </Grid>
//     </ListGroupItem>
//     )
//   } else {
//     return
//   }
// }
//
// getAssignedQwestButtonGroup(key) {
//   return (
//     <div className="Qwest-item-actions">
//       <Col sm={4} xsHidden>
//         <ButtonGroup>
//           <Button
//             bsStyle="primary"
//             onClick={() => this.showAssignQwestModal(key)}
//           >
//             Reassign
//           </Button>
//           <Button
//             bsStyle="warning"
//             onClick={() => this.state.qwestManager.revoke(key)}
//           >
//             Revoke
//           </Button>
//           <Button
//             bsStyle="danger"
//             onClick={() => this.state.qwestManager.delete(key)}
//           >
//             Delete
//           </Button>
//         </ButtonGroup>
//       </Col>
//       <Col xs={2} smHidden mdHidden lgHidden>
//         <DropdownButton id="actions-dropdown" title="Actions">
//           <MenuItem
//             eventKey="1"
//             onClick={() => this.showAssignQwestModal(key)}
//           >
//             Reassign
//           </MenuItem>
//           <MenuItem
//             eventKey="2"
//             onClick={() => this.state.qwestManager.revoke(key)}
//           >
//             Revoke
//           </MenuItem>
//           <MenuItem
//             eventKey="3"
//             onClick={() => this.state.qwestManager.delete(key)}
//           >
//             Delete
//           </MenuItem>
//         </DropdownButton>
//       </Col>
//     </div>
//   )
// }
//
// getPendingQwestList() {
//   if (this.state.userQwests.pending) {
//     return Object.keys(this.state.userQwests.pending).map((key) =>
//       <ListGroupItem key={key}>
//         <Grid>
//           <Row>
//             <Col xs={10} sm={8}>
//               <Linkify>
//                 {this.state.userQwests.pending[key].title}
//               </Linkify>
//             </Col>
//             {this.getPendingQwestButtonGroup(key)}
//           </Row>
//         </Grid>
//       </ListGroupItem>
//     )
//   } else {
//     return
//   }
// }
//
// getPendingQwestButtonGroup(key) {
//   return (
//     <div className="Qwest-item-actions">
//       <Col sm={4} xsHidden>
//         <ButtonGroup>
//           <Button
//             bsStyle="primary"
//             onClick={() => this.state.qwestManager.accept(key)}
//           >
//             Accept
//           </Button>
//           <Button
//             bsStyle="danger"
//             onClick={() => this.state.qwestManager.reject(key)}
//           >
//             Reject
//           </Button>
//         </ButtonGroup>
//       </Col>
//       <Col xs={2} smHidden mdHidden lgHidden>
//         <DropdownButton id="actions-dropdown" title="Actions">
//           <MenuItem
//             eventKey="1"
//             onClick={() => this.state.qwestManager.accept(key)}
//           >
//             Accept
//           </MenuItem>
//           <MenuItem
//             eventKey="2"
//             onClick={() => this.state.qwestManager.reject(key)}
//           >
//             Reject
//           </MenuItem>
//         </DropdownButton>
//       </Col>
//     </div>
//   )
// }
