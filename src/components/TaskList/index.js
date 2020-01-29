import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import * as ROUTES from '../../constants/routes'

const TaskList = props => {
  // Deconstruct properties
  const { authUser, firebase, game, qwest, history } = props
  // Load state
  const [tasks, setTasks] = useState([])
  // Define methods
  const completeTask = task => {
    // Complete the task
    // firebase.completeTask(task.id)
  }

  const viewTaskDetails = task => {
    if (game) {
      history.push(
        `${ROUTES.GAMES}/${game.id}${ROUTES.QWESTS}/${qwest.id}${ROUTES.TASKS}/${task.id}`,
      )
    } else {
      history.push(`${ROUTES.QWESTS}/${qwest.id}${ROUTES.TASKS}/${task.id}`)
    }
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwests collection
    let unsubscribe
    // Determine the context of the task list (game or user)
    // if (game) {
    //   unsubscribe = firebase.gameQwests(game.id).onSnapshot(snapshot => {
    //     setQwests(snapshot.docs)
    //   })
    // } else {
    //   unsubscribe = firebase.userQwests(authUser.uid).onSnapshot(snapshot => {
    //     setQwests(snapshot.docs)
    //   })
    // }
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, game])
  // Return component
  return (
    <Card>
      <CardHeader title="Tasks" />
      <CardContent>
        <List>
          {tasks.map(task => (
            <ListItem
              key={qwest.id}
              button
              onClick={() => viewTaskDetails(task)}
            >
              <ListItemText primary={task.data().name} />
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="complete"
                  onClick={() => completeTask(task)}
                >
                  <CheckCircleOutlineIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

const CompletedTaskList = props => {
  // Deconstruct properties
  const { authUser, firebase, game, qwest, history } = props
  // Load state
  const [tasks, setTasks] = useState([])
  // Define methods
  const resetTask = task => {
    // Reset the task
    firebase.resetTask(task.id)
  }

  const viewTaskDetails = task => {
    if (game) {
      history.push(
        `${ROUTES.GAMES}/${game.id}${ROUTES.QWESTS}/${qwest.id}${ROUTES.TASKS}/${task.id}`,
      )
    } else {
      history.push(`${ROUTES.QWESTS}/${qwest.id}${ROUTES.TASKS}/${task.id}`)
    }
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwests collection
    let unsubscribe
    // Determine the context of the task list (game or user)
    // if (game) {
    //   unsubscribe = firebase
    //     .gameCompletedQwests(game.id)
    //     .onSnapshot(snapshot => {
    //       setQwests(snapshot.docs)
    //     })
    // } else {
    //   unsubscribe = firebase
    //     .userCompletedQwests(authUser.uid)
    //     .onSnapshot(snapshot => {
    //       setQwests(snapshot.docs)
    //     })
    // }
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, game])
  // Return component
  return (
    <Card>
      <CardHeader title="Completed Tasks" />
      <CardContent>
        <List>
          {tasks.map(task => (
            <ListItem
              key={task.id}
              button
              onClick={() => viewTaskDetails(task)}
            >
              <ListItemText primary={task.data().name} />
              <ListItemSecondaryAction>
                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="reset"
                  onClick={() => resetTask(task)}
                >
                  <CheckCircleIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export { TaskList, CompletedTaskList }
