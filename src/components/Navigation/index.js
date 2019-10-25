import React from 'react'
import Aux from 'react-aux'
import { Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import LayersIcon from '@material-ui/icons/Layers'

import * as ROLES from '../../constants/roles'
import * as ROUTES from '../../constants/routes'
import { AuthUserContext } from '../Session'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Aux>
        <ListItem button component={Link} to={ROUTES.HOME}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to={ROUTES.QWESTS}>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Qwests" />
        </ListItem>
        {!!authUser.roles[ROLES.ADMIN] && (
          <ListItem button component={Link} to={ROUTES.ADMIN}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
        )}
      </Aux>
    )}
  </AuthUserContext.Consumer>
)

export default Navigation
