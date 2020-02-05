import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const PostCreate = props => {
  // Deconstruct properties
  const { authUser, firebase, taskId, qwestId, gameId } = props
  // Load state
  const [message, setMessage] = useState('')
  // Define methods
  const clearForm = () => {
    setMessage('')
  }

  const onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Create new post object
    const newPost = {
      message: message,
      username: authUser.username,
      createdAt: firebase.FieldValue.serverTimestamp(),
    }
    // Create new post
    if (taskId) {
      firebase.createTaskPost(taskId, newPost)
    } else if (qwestId) {
      firebase.createQwestPost(qwestId, newPost)
    } else {
      firebase.createGamePost(gameId, newPost)
    }
    // Clear the form
    clearForm()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Create Post" />
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            id="message"
            label="Message"
            fullWidth
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!message}
          >
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default PostCreate
