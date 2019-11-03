import React, { useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Aux from 'react-aux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

import * as ROUTES from '../../constants/routes'
import AccountPage from '../Account'
import AdminPage from '../Admin'
import FriendsPage from '../Friends'
import HomePage from '../Home'
import LandingPage from '../Landing'
import Navigation from '../Navigation'
import PasswordForgetPage from '../PasswordForget'
import GamesPage from '../Games'
import GameDetailsPage from '../GameDetails'
import QwestsPage from '../Qwests'
import SignInPage from '../SignIn'
import SignOutButton from '../SignOut'
import SignUpPage from '../SignUp'
import { AuthUserContext } from '../Session'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Qwestr">
        Qwestr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  accountButton: {
    color: 'white',
  },
}))

const Layout = props => {
  // Load styles
  const classes = useStyles()
  // Load state
  const [open, setOpen] = useState(true)
  // Define methods
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  // Return component
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className={classes.root}>
          <CssBaseline />
          {authUser && (
            <Aux>
              <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
              >
                <Toolbar className={classes.toolbar}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                      classes.menuButton,
                      open && classes.menuButtonHidden,
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Qwestr
                  </Typography>
                  <IconButton
                    className={classes.accountButton}
                    onClick={() => props.history.push(ROUTES.ACCOUNT)}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <SignOutButton />
                </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(
                    classes.drawerPaper,
                    !open && classes.drawerPaperClose,
                  ),
                }}
                open={open}
              >
                <div className={classes.toolbarIcon}>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <Navigation />
              </Drawer>
            </Aux>
          )}
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.QWESTS} component={QwestsPage} />
              <Route exact path={ROUTES.GAMES} component={GamesPage} />
              <Route path={ROUTES.GAME_DETAILS} component={GameDetailsPage} />
              <Route path={ROUTES.FRIENDS} component={FriendsPage} />
            </Container>
            <Copyright />
          </main>
        </div>
      )}
    </AuthUserContext.Consumer>
  )
}

export default withRouter(Layout)
