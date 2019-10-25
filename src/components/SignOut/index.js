import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import { withFirebase } from '../Firebase'

const SignOutButton = ({ firebase }) => (
  <IconButton color="secondary" onClick={firebase.doSignOut}>
    <PowerSettingsNewIcon />
  </IconButton>
)

export default withFirebase(SignOutButton)
