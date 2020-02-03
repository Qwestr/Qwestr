import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const TaskCreate = props => {
  // Deconstruct properties
  const { firebase, qwest } = props
  // Load state
  const [name, setName] = useState('')
  // Define methods
  const clearForm = () => {
    setName('')
  }

  const onSubmit = event => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Create new task object
    const newTask = {
      qwestId: qwest.id,
      name: name,
      isCompleted: false,
      createdAt: firebase.FieldValue.serverTimestamp(),
    }
    // Create new task
    firebase.createQwestTask(qwest.id, newTask)
    // Clear the form
    clearForm()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Create Task" />
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
        </CardActions>
      </form>
    </Card>
  )
}

export default TaskCreate
