import React from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Typography from '@material-ui/core/Typography'

import { withAuthorization, withEmailVerification } from '../Session'

const GameDetailsPage = () => {
  // Load url params
  const { id } = useParams()
  // Return component
  return (
    <Aux>
      <Typography variant="h4" gutterBottom>
        Game Details: {id}
      </Typography>
    </Aux>
  )
}

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GameDetailsPage)
