import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import { useParams } from 'react-router-dom'
import { compose } from 'recompose'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import * as ROUTES from '../../constants/routes'
import ConfirmDialog from '../ConfirmDialog'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'

const QwestDetailsPage = props => {
  // Deconstruct properties
  const { firebase, history } = props
  // Load url params
  const { gameId, id } = useParams()
  // Load state
  const [qwest, setQwest] = useState(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  // Define methods
  const confirmQwestDelete = () => {
    // Open confirm dialog
    setIsConfirmDialogOpen(true)
  }

  const handleQwestDelete = confirm => {
    if (confirm) {
      // Delete qwest
      firebase.deleteQwest(qwest.id)
      if (gameId) {
        // Push to the game details page
        history.push(`${ROUTES.GAMES}/${gameId}`)
      } else {
        // Push to the qwests page
        history.push(ROUTES.QWESTS)
      }
    }
    // Close confirm dialog
    setIsConfirmDialogOpen(false)
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwest collection object
    const unsubscribe = firebase.qwest(id).onSnapshot(snapshot => {
      setQwest(snapshot)
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [id, firebase])
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <Aux>
          {qwest && (
            <Aux>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    <CardHeader title="Details" />
                    <CardContent>
                      <Typography variant="body1">
                        <b>Name: </b> {qwest.data().name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="secondary"
                        aria-label="delete"
                        onClick={confirmQwestDelete}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  {/* TODO put new qwest functionality here... */}
                </Grid>
              </Grid>
              <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                handleClose={handleQwestDelete}
                title="Delete Qwest"
                message="Are you sure you want to delete this qwest?  This cannot be undone."
              />
            </Aux>
          )}
        </Aux>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export { QwestDetailsPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(QwestDetailsPage)
