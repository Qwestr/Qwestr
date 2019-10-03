import React from 'react'
import Aux from 'react-aux'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

const QwestList = props => {
  // Destructure props
  const { qwests, onDelete } = props
  // Return component
  return (
    <Aux>
      <Typography variant="h5" gutterBottom>
        Qwests
      </Typography>
      <List>
        {qwests.map((qwest, index) => (
          <ListItem key={index}>
            <ListItemText primary={qwest.name} />
            <ListItemSecondaryAction>
              <IconButton
                color="secondary"
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(index)}
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

export default QwestList
