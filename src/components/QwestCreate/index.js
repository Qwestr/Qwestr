import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const QwestCreate = props => {
  // Load state
  const [name, setName] = useState('')
  // Define methods
  const clearForm = () => {
    setName('')
  }

  const onSubmit = (event, authUser) => {
    // Prevent default form submission
    // DONT REMOVE!
    event.preventDefault()
    // Create new qwest object
    const newQwest = {
      userId: authUser.uid,
      name: name,
      createdAt: props.firebase.serverValues.serverTimestamp(),
    }
    // Add new qwest
    props.firebase.qwests().add(newQwest)
    // Clear the form
    clearForm()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Create Qwest" />
      <form onSubmit={event => onSubmit(event, props.authUser)}>
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

export default QwestCreate
