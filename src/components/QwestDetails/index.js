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
import QwestEdit from '../QwestEdit'
import TaskCreate from '../TaskCreate'
import { TaskList, CompletedTaskList } from '../TaskList'
import { withAuthorization, withEmailVerification } from '../Session'

const QwestDetailsPage = props => {
  // Deconstruct properties
  const { firebase, history } = props
  // Load url params
  const { gameId, id } = useParams()
  // Load state
  const [qwest, setQwest] = useState(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  // Define methods
  const viewPosts = () => {
    history.push(`${ROUTES.QWESTS}/${id}/posts`)
  }

  const editQwest = () => {
    setIsEditMode(true)
  }

  const handleQwestEditClose = () => {
    setIsEditMode(false)
  }

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
    <Aux>
      {qwest && (
        <Aux>
          <Grid container spacing={3}>
            {!isEditMode ? (
              <Aux>
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
                        color="primary"
                        aria-label="view"
                        onClick={viewPosts}
                      >
                        Posts
                      </Button>
                      <Button
                        variant="contained"
                        color="default"
                        aria-label="view"
                        onClick={editQwest}
                      >
                        Edit
                      </Button>
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
                  <TaskCreate firebase={firebase} qwest={qwest} />
                </Grid>
                <Grid item xs={12}>
                  <TaskList
                    firebase={firebase}
                    history={history}
                    qwest={qwest}
                    gameId={gameId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CompletedTaskList
                    firebase={firebase}
                    history={history}
                    qwest={qwest}
                    gameId={gameId}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* TODO put qwest posts here... */}
                </Grid>
              </Aux>
            ) : (
              <Grid item xs={12}>
                <QwestEdit
                  firebase={firebase}
                  qwest={qwest}
                  close={handleQwestEditClose}
                ></QwestEdit>
              </Grid>
            )}
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
  )
}

const condition = authUser => !!authUser

export { QwestDetailsPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(QwestDetailsPage)
