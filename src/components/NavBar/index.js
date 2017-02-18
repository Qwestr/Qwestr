import React, { Component } from 'react';
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import firebase from 'firebase';
import classnames from 'classnames';
import { logout } from '../../helpers/Auth';
import './style.css';

class NavBar extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      isAuthLoaded: false,
      user: null
    };
  }

  getUserProfileNavItem(user) {
    return (
      <NavItem className="Navbar-profile-item">
        {user.displayName}
        <Image className="Navbar-profile-item-image" src={user.photoURL} circle />
      </NavItem>
    );
  }

  getNavbarItems(activePath) {
    // Return nav items depending on if the User is authenticated
    if (this.state.user) {
      return (
        <div className="App-navbar-items">
          <Nav activeHref={activePath}>
            <NavItem href="/qwest/list">Qwests</NavItem>
            <NavItem href="/qwest/new">New Qwest</NavItem>
          </Nav>
          <Nav pullRight>
            {this.getUserProfileNavItem(this.state.user)}
            <NavItem onClick={logout}>Logout</NavItem>
          </Nav>
      </div>
      );
    } else {
      if (this.state.isAuthLoaded) {
        return (
          <div className="App-navbar-items">
            <Nav activeHref={activePath} pullRight>
              <NavItem href="/login">Login</NavItem>
            </Nav>
          </div>
        );
      } else {
        // Do not return any items until authentication is loaded
        return (
          <div className="App-navbar-items" />
        );
      }
    }
  }

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      // set the state
      this.setState({
        isAuthLoaded: true,
        user: user
      });
    });
  }

  componentDidMount() {
    // setup listeners
    this.watchAuthState();
  }

  render() {
    // declare relevant properties as local variables
    const { activePath, className, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('NavBar', className)}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Qwestr</a>
            </Navbar.Brand>
          </Navbar.Header>
          {this.getNavbarItems(activePath)}
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
