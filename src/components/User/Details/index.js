import React, { Component } from 'react'
import { Col, Grid, Glyphicon, Image, Panel, Row } from 'react-bootstrap'
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
    // Set props
    super(props)

    // Set state
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
      return (
        <Glyphicon className="user-details-default-image" glyph="user" />
      )
    }
  }

  getDisplayName(user) {
    if (user.displayName) {
      return user.displayName
    } else {
      return 'Qwestr User'
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
                  {this.getDisplayName(this.state.user)}
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
