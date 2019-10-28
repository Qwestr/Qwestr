import React from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'
import Typography from '@material-ui/core/Typography'

import { withAuthorization, withEmailVerification } from '../Session'

const HomePage = () => (
  <Aux>
    <Typography variant="h4" gutterBottom>
      Home
    </Typography>
  </Aux>
)

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePage)
