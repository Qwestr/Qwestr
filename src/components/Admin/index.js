import React, { Component } from 'react'
import { compose } from 'recompose'

import * as ROLES from '../../constants/roles'
import { withFirebase } from '../Firebase'
import { withAuthorization } from '../Session'

class AdminPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      users: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.props.firebase
      .users()
      .get()
      .then(snapshot => {
        this.setState({
          users: snapshot.docs,
          loading: false,
        })
      })
  }

  render() {
    const { users, loading } = this.state

    return (
      <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    )
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>
        <span>
          <strong>ID:</strong> {user.id}
        </span>
        <br />
        <span>
          <strong>E-Mail:</strong> {user.data().email}
        </span>
        <br />
        <span>
          <strong>Username:</strong> {user.data().username}
        </span>
        <br />
        <br />
      </li>
    ))}
  </ul>
)

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage)
