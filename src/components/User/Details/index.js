import React, { Component } from 'react'
import { Col, Grid, Image, Panel, Row } from 'react-bootstrap'
import UserManager from '../../../managers/User'
import './style.css'

export default class UserDetails extends Component {
  static propTypes = {
    params: React.PropTypes.shape({
      userId: React.PropTypes.string
    }),
    manager: React.PropTypes.instanceOf(UserManager),
  }

  static defaultProps = {
    params: {
      userId: 'defaultUserId'
    },
    manager: new UserManager()
  }

  constructor(props) {
    // set props
    super(props)

    // set state
    this.state = {
      noUserFound: false,
      user: {}
    }
  }

  componentDidMount() {
    // Get User data
    const userData = {
      uid: this.props.params.userId
    }

    this.props.manager.getUser(userData, (data) => {
      if (!data.val()) {
        // Update state
        this.setState({noUserFound: true})
      } else {
        // Update state
        this.setState({user: data.val()})
      }
    })
  }

  getUserImage(user) {
    if (user.photoURL) {
      return (
        <Image className="user-details-image" src={user.photoURL} responsive circle />
      )
    } else {
      return null
    }
  }

  getUserDetails(header) {
    if (!this.state.noUserFound) {
      return (
        <Panel header={header}>
          <Grid>
            <Row>
              <Col xs={3}>
                {this.getUserImage(this.state.user)}
              </Col>
              <Col xs={9}>
                <div className="user-details-name">
                  {this.state.user.displayName}
                </div>
              </Col>
            </Row>
          </Grid>
        </Panel>
      )
    } else {
      return (
        <div className="user-not-found">
          <h1>
            <small>User Not Found :(</small>
          </h1>
        </div>
      )
    }
  }

  render() {
    // declare local variables
    const panelHeader = (<h3>User Details</h3>)

    // render the veiw
    return (
      <div className="UserDetails">
        {this.getUserDetails(panelHeader)}
      </div>
    )
  }
}
