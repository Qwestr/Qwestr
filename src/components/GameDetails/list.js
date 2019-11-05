import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const PlayerList = props => {
  // Deconstruct properties
  const { firebase, game } = props
  // Load state
  const [players, setPlayers] = useState([])
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the players collection
    const unsubscribe = firebase.gamePlayers(game.id).onSnapshot(snapshot => {
      setPlayers(snapshot.docs)
    })
    // Unsubscribe from listener when component is destroyed
    return () => {
      unsubscribe()
    }
  }, [firebase, game])
  // Return component
  return (
    <Card>
      <CardHeader title="Players" />
      <CardContent>
        <List>
          {players.map(player => (
            <ListItem key={player.id}>
              <ListItemText
                primary={player.data().username}
                secondary={player.data().email}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default PlayerList
