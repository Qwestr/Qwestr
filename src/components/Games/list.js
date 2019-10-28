import React, { useEffect, useState } from 'react'
import Aux from 'react-aux'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

const GameList = props => {
  // Load state
  const [games, setGames] = useState([])
  // Define methods
  const handleGameDelete = id => {
    // Delete game
    props.firebase.game(id).delete()
  }
  // Define effects handlers
  useEffect(() => {
    // Setup listener to the games collection
    // const unsubscribe = props.firebase
    //   .userGames(props.authUser)
    //   .onSnapshot(snapshot => {
    //     setGames(snapshot.docs)
    //   })
    // // Unsubscribe from listener when component is destroyed
    // return () => {
    //   unsubscribe()
    // }
  }, [props.authUser, props.firebase])
  // Return component
  return (
    <Aux>
      <Typography variant="h5" gutterBottom>
        Games
      </Typography>
      <List>
        {games.map(game => (
          <ListItem key={game.id}>
            <ListItemText primary={game.data().name} />
            <ListItemSecondaryAction>
              <IconButton
                color="secondary"
                edge="end"
                aria-label="delete"
                onClick={() => handleGameDelete(game.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Aux>
  )
}

export default GameList
