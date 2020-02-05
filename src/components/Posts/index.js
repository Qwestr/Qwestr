import React from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'
import PostCreate from './create'
import PostList from './list'

const PostsPage = props => {
  // Deconstruct properties
  const { firebase } = props
  // Load url params
  const { taskId, qwestId, gameId } = useParams()
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          <Typography variant="h4" gutterBottom>
            Posts
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PostCreate
                authUser={authUser}
                firebase={firebase}
                taskId={taskId}
                qwestId={qwestId}
                gameId={gameId}
              />
            </Grid>
            <Grid item xs={12}>
              <PostList
                authUser={authUser}
                firebase={firebase}
                taskId={taskId}
                qwestId={qwestId}
                gameId={gameId}
              />
            </Grid>
          </Grid>
        </Aux>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export { PostCreate, PostList, PostsPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(PostsPage)
