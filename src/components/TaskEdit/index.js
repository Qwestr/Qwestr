import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const TaskEdit = props => {
  // Deconstruct properties
  const { firebase, task, close } = props
  // Load state
  const [name, setName] = useState(task.data().name)
  // Define methods
  const onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Create updated task object
    const updatedTask = {
      name: name,
      updatedAt: firebase.FieldValue.serverTimestamp(),
    }
    // Update the task
    firebase.updateTask(task, updatedTask)
    // Call the close callback
    close()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Edit Task" />
      <form onSubmit={onSubmit}>
        <CardContent>
          <TextField
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!name}
          >
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={close}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default TaskEdit
