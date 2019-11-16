import React from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'
import { FriendInviteForm, ReceivedInviteList, SentInviteList } from './invite'
import FriendList from './list'

const FriendsPage = props => {
  // Deconstruct properties
  const { firebase } = props
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          <Typography variant="h4" gutterBottom>
            Friends
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FriendInviteForm firebase={firebase} authUser={authUser} />
            </Grid>
            <Grid item xs={12}>
              <SentInviteList firebase={firebase} authUser={authUser} />
            </Grid>
            <Grid item xs={12}>
              <ReceivedInviteList firebase={firebase} authUser={authUser} />
            </Grid>
            <Grid item xs={12}>
              <FriendList firebase={firebase} authUser={authUser} />
            </Grid>
          </Grid>
        </Aux>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export {
  FriendInviteForm,
  ReceivedInviteList,
  SentInviteList,
  FriendList,
  FriendsPage,
}

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(FriendsPage)
