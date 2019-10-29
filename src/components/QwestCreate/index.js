import React, { useState } from 'react'
import Aux from 'react-aux'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const QwestCreate = props => {
  // Load styles
  const classes = useStyles()
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
    <Aux>
      <Typography variant="h5" gutterBottom>
        Create Qwest
      </Typography>
      <form onSubmit={event => onSubmit(event, props.authUser)}>
        <TextField
          id="name"
          label="Name"
          fullWidth
          className={classes.textField}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
          disabled={!name}
        >
          Submit
        </Button>
      </form>
    </Aux>
  )
}

export default QwestCreate
