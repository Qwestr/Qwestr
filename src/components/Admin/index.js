import React, { Component } from 'react'

import { withFirebase } from '../Firebase'

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
    this.props.firebase.users().then(querySnapshot => {
      this.setState({
        users: querySnapshot.docs,
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    // TODO: properly migrate firebase unsubscribe to firestore
    // this.props.firebase.users().off()
  }

  render() {
    const { users, loading } = this.state

    return (
      <div>
        <h1>Admin</h1>
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
        <br></br>
        <span>
          <strong>E-Mail:</strong> {user.data().email}
        </span>
        <br></br>
        <span>
          <strong>Username:</strong> {user.data().username}
        </span>
        <br></br>
      </li>
    ))}
  </ul>
)

export default withFirebase(AdminPage)
