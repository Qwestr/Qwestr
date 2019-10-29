import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'

import QwestCreate from '../QwestCreate'
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
      {game && (
        <Aux>
          <Card>
            <CardHeader title="Details" />
            <CardContent>
              <Typography variant="body2">
                <b>Name: </b> {game.name}
              </Typography>
            </CardContent>
          </Card>
          <QwestCreate />
        </Aux>
      )}
    </Aux>
  )
}

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(GameDetailsPage)
