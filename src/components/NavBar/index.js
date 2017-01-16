import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import firebase from 'firebase';
import classnames from 'classnames';
import { logout } from '../../lib/auth';
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

  getNavbarItems() {
    // Return nav items depending on if the User is authenticated
    if (this.state.user) {
      return (
        <div className="App-navbar-items">
          <Nav>
            <NavItem href="/qwest/list">Qwests</NavItem>
            <NavItem href="/qwest/new">New Qwest</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={logout}>Logout</NavItem>
          </Nav>
      </div>
      );
    } else {
      if (this.state.isAuthLoaded) {
        return (
          <div className="App-navbar-items">
            <Nav pullRight>
              <NavItem href="/login">Login</NavItem>
            </Nav>
          </div>
        );
      } else {
        // don't return any nav items until authentication is loaded
        return (
          <div className="App-navbar-items" />
        );
      }
    }
  }

  watchAuthState() {
    // setup auth change listener
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user: ' + user);
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
    const { className, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('NavBar', className)}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Qwestr</a>
            </Navbar.Brand>
          </Navbar.Header>
          {this.getNavbarItems()}
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
