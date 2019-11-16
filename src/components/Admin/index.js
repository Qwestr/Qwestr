import React, { Component } from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import * as ROLES from '../../constants/roles'
import { withAuthorization, withEmailVerification } from '../Session'
import { Typography } from '@material-ui/core'

const UserList = ({ users }) => (
  <Paper>
    <Table aria-label="user list">
      <TableHead>
        <TableRow>
          <TableCell align="left">Username</TableCell>
          <TableCell align="left">Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell align="left">{user.data().username}</TableCell>
            <TableCell align="left">{user.data().email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)

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
    // Setup listener to the collection
    this.unsubscribe = this.props.firebase.users().onSnapshot(snapshot => {
      this.setState({
        users: snapshot.docs,
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    // Unsubscribe to collection listener
    this.unsubscribe()
  }

  render() {
    const { users, loading } = this.state

    return (
      <Aux>
        <Typography variant="h4" gutterBottom>
          Admin
        </Typography>
        {loading && <div>Loading ...</div>}
        {!loading && <UserList users={users} />}
      </Aux>
    )
  }
}

const condition = authUser => authUser && !!authUser.roles[ROLES.ADMIN]

export { UserList, AdminPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AdminPage)
