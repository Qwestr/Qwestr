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

const QwestList = props => {
  // Deconstruct properties
  const { authUser, firebase, game, history } = props
  // Load state
  const [qwests, setQwests] = useState([])
  // Define methods
  const completeQwest = qwest => {
    // Complete the qwest
    firebase.completeQwest(qwest.id)
  }

  const viewQwestDetails = qwest => {
    if (game) {
      history.push(`${ROUTES.GAMES}/${game.id}${ROUTES.QWESTS}/${qwest.id}`)
    } else {
      history.push(`${ROUTES.QWESTS}/${qwest.id}`)
    }
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwests collection
    let unsubscribe
    // Determine the context of the qwest list (game or user)
    if (game) {
      unsubscribe = firebase.gameQwests(game.id).onSnapshot(snapshot => {
        setQwests(snapshot.docs)
      })
    } else {
      unsubscribe = firebase.userQwests(authUser.uid).onSnapshot(snapshot => {
        setQwests(snapshot.docs)
      })
    }
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, game])
  // Return component
  return (
    <Card>
      <CardHeader title="Qwests" />
      <CardContent>
        <List>
          {qwests.map(qwest => (
            <ListItem
              key={qwest.id}
              button
              onClick={() => viewQwestDetails(qwest)}
            >
              <ListItemText primary={qwest.data().name} />
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="complete"
                  onClick={() => completeQwest(qwest)}
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

const CompletedQwestList = props => {
  // Deconstruct properties
  const { authUser, firebase, game, history } = props
  // Load state
  const [qwests, setQwests] = useState([])
  // Define methods
  const resetQwest = qwest => {
    // Reset the qwest
    firebase.resetQwest(qwest.id)
  }

  const viewQwestDetails = qwest => {
    if (game) {
      history.push(`${ROUTES.GAMES}/${game.id}${ROUTES.QWESTS}/${qwest.id}`)
    } else {
      history.push(`${ROUTES.QWESTS}/${qwest.id}`)
    }
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the qwests collection
    let unsubscribe
    // Determine the context of the qwest list (game or user)
    if (game) {
      unsubscribe = firebase.gameQwests(game.id).onSnapshot(snapshot => {
        setQwests(snapshot.docs)
      })
    } else {
      unsubscribe = firebase
        .userCompletedQwests(authUser.uid)
        .onSnapshot(snapshot => {
          setQwests(snapshot.docs)
        })
    }
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [authUser, firebase, game])
  // Return component
  return (
    <Card>
      <CardHeader title="Completed Qwests" />
      <CardContent>
        <List>
          {qwests.map(qwest => (
            <ListItem
              key={qwest.id}
              button
              onClick={() => viewQwestDetails(qwest)}
            >
              <ListItemText primary={qwest.data().name} />
              <ListItemSecondaryAction>
                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="reset"
                  onClick={() => resetQwest(qwest)}
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

export { QwestList, CompletedQwestList }
