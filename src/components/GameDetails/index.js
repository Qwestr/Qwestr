import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Typography from '@material-ui/core/Typography'

import { withAuthorization, withEmailVerification } from '../Session'

const GameDetailsPage = props => {
  // Load url params
  const { id } = useParams()
  // Load state
  const [game, setGame] = useState(null)
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the game collection object
    const unsubscribe = props.firebase.game(id).onSnapshot(snapshot => {
      setGame(snapshot.data())
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [id, props.firebase])
  // Return component
  return (
    <Aux>
      <Typography variant="h4" gutterBottom>
        Game
      </Typography>
    </Aux>
  )
}

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GameDetailsPage)
