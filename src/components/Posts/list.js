import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'

const PostList = props => {
  // Deconstruct properties
  const { authUser, firebase, qwestId } = props
  // Load state
  const [posts, setPosts] = useState([])
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the posts collection
    let unsubscribe = firebase.qwestPosts(qwestId).onSnapshot(snapshot => {
      console.log('post 1', snapshot.docs[0].data())
      setPosts(snapshot.docs)
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, qwestId])
  // Return component
  return (
    <Card>
      <CardHeader title="Posts" />
      <CardContent>
        {/* <List>
          {posts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.data().message} />
            </ListItem>
          ))}
        </List> */}
        <Grid container spacing={3}>
          {posts.map(post => (
            <Grid item key={post.id} xs={12}>
              <Card>
                <CardContent>
                  <Typography gutterBottom>{post.data().message}</Typography>
                  <Typography gutterBottom>{post.data().username}</Typography>
                  {/* <Typography gutterBottom>{post.data().createdAt}</Typography> */}
                  {/* <Typography variant="h5" component="h2">
                  be
                  {bull}
                  nev
                  {bull}o{bull}
                  lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography> */}
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
