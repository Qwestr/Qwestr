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
// import TaskEdit from '../TaskEdit'
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session'

const TaskDetailsPage = props => {
  // Deconstruct properties
  const { firebase, history } = props
  // Load url params
  const { gameId, qwestId, id } = useParams()
  // Load state
  const [task, setTask] = useState(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  // Define methods
  const viewPosts = () => {
    // history.push(`${ROUTES.QWESTS}/${id}/posts`)
  }

  const editTask = () => {
    setIsEditMode(true)
  }

  const handleTaskEditClose = () => {
    setIsEditMode(false)
  }

  const confirmTaskDelete = () => {
    // Open confirm dialog
    setIsConfirmDialogOpen(true)
  }

  const handleTaskDelete = confirm => {
    if (confirm) {
      // Delete task
      // firebase.deleteTask(task.id)
      if (gameId) {
        // Push to the game qwest details page
        // history.push(`${ROUTES.GAMES}/${gameId}`)
      } else {
        // Push to the qwest details page
        // history.push(ROUTES.QWESTS)
      }
    }
    // Close confirm dialog
    setIsConfirmDialogOpen(false)
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the task collection object
    const unsubscribe = firebase.qwestTask(qwestId, id).onSnapshot(snapshot => {
      setTask(snapshot)
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
          {task && (
            <Aux>
              <Grid container spacing={3}>
                {!isEditMode ? (
                  <Aux>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader title="Details" />
                        <CardContent>
                          <Typography variant="body1">
                            <b>Name: </b> {task.data().name}
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
                            onClick={editTask}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            aria-label="delete"
                            onClick={confirmTaskDelete}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Aux>
                ) : (
                  <Grid item xs={12}>
                    {/* <TaskEdit
                      firebase={firebase}
                      qwest={qwest}
                      close={handleTaskEditClose}
                    ></TaskEdit> */}
                  </Grid>
                )}
              </Grid>
              <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                handleClose={handleTaskDelete}
                title="Delete Task"
                message="Are you sure you want to delete this task?  This cannot be undone."
              />
            </Aux>
          )}
        </Aux>
      )}
    </AuthUserContext.Consumer>
  )
}

const condition = authUser => !!authUser

export { TaskDetailsPage }

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(TaskDetailsPage)
