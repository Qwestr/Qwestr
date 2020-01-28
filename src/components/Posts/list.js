import React, { useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import Moment from 'react-moment'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const PostList = props => {
  // Deconstruct properties
  const { authUser, firebase, qwestId, gameId } = props
  // Load state
  const [posts, setPosts] = useState([])
  // Define methods
  const linkComponentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  )
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the posts collection
    let unsubscribe
    if (gameId) {
      unsubscribe = firebase
        .mostRecentGamePosts(gameId)
        .onSnapshot(snapshot => {
          setPosts(snapshot.docs)
        })
    } else {
      unsubscribe = firebase
        .mostRecentQwestPosts(qwestId)
        .onSnapshot(snapshot => {
          setPosts(snapshot.docs)
        })
    }
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, qwestId, gameId])
  // Return component
  return (
    <Card>
      <CardHeader title="Posts" />
      <CardContent>
        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid item key={post.id} xs={12}>
              <Card>
                <CardContent>
                  {/* Note: componentDecorator not part of declared component API for Linkify */}
                  {/* Solution found here: https://github.com/tasti/react-linkify/issues/78#issuecomment-514754050 */}
                  <Linkify componentDecorator={linkComponentDecorator}>
                    <Typography gutterBottom>{post.data().message}</Typography>
                  </Linkify>
                  <Typography color="textSecondary" variant="body2">
                    <b>{post.data().username}</b> @{' '}
                    {post.data().createdAt && (
                      <Moment>{post.data().createdAt.toDate()}</Moment>
                    )}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PostList
