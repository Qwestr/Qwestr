import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/TextField'

const QwestEdit = props => {
  // Deconstruct properties
  const { firebase, qwest, cancel } = props
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
    // Create new qwest object
    // const newQwest = {
    //   name: name,
    //   isCompleted: false,
    //   createdAt: firebase.FieldValue.serverTimestamp(),
    // }
    // // Determine the context of the qwest list (game or user)
    // if (game) {
    //   newQwest.gameId = game.id
    // } else {
    //   newQwest.userId = authUser.uid
    // }
    // // Create new qwest
    // firebase.createQwest(newQwest)
    // // Clear the form
    // clearForm()
  }
  // Return component
  return (
    <Card>
      <CardHeader title="Edit Qwest" />
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
          <Button variant="contained" color="secondary" onClick={cancel}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default QwestEdit
