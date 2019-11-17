import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import { makeStyles } from '@material-ui/core/styles'

import { withFirebase } from '../Firebase'

const useStyles = makeStyles({
  button: {
    color: 'white',
  },
})

const SignOutButton = ({ firebase }) => {
  // Load styles
  const classes = useStyles()
  // Define methods
  const signOut = () => {
    firebase.doSignOut()
  }
  return (
    <IconButton className={classes.button} onClick={signOut}>
      <PowerSettingsNewIcon />
    </IconButton>
  )
}

export { SignOutButton }

export default withFirebase(SignOutButton)
