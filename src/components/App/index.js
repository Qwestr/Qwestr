import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import firebase from 'firebase';
import classnames from 'classnames';
import { logout } from '../../lib/auth';
import './style.css';

class App extends Component {
  constructor(props) {
    // set props
    super(props);

    // set state
    this.state = {
      user: null
    };
  }

  getNavbarItems(user) {
    // return items depending on if the user is logged in or not
    if (user) {
      return (
        <div className="App-navbar-items">
          <Nav>
            <NavItem href="/qwest/new">New Qwest</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem onClick={logout}>Logout</NavItem>
          </Nav>
      </div>
      );
    } else {
      return (
        <div className="App-navbar-items">
          <Nav pullRight>
            <NavItem href="/login">Login</NavItem>
          </Nav>
        </div>
      );
    }
  }

  watchAuthState() {
    // setup listener
    firebase.auth().onAuthStateChanged((user) => {
      // set the user
      this.setState({user: user});
    });
  }

  componentDidMount() {
    // setup listener for user changes
    this.watchAuthState();
  }

  render() {
    // declare relevant properties as local variables
    const { className, children, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('App', className)}>
        <div className="App-navbar">
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Qwestr</a>
              </Navbar.Brand>
            </Navbar.Header>
            {this.getNavbarItems(this.state.user)}
          </Navbar>
        </div>
        <div className="App-content">
          {children}
        </div>
      </div>
    );
  }
}

export default App;
