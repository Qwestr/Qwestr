import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const PostList = props => {
  // Deconstruct properties
  const { authUser, firebase, qwestId } = props
  // Load state
  const [posts, setPosts] = useState([])
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the posts collection
    let unsubscribe = firebase.qwestPosts(qwestId).onSnapshot(snapshot => {
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
        <List>
          {posts.map(post => (
            <ListItem key={post.id}>
              <ListItemText primary={post.data().message} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default PostList
