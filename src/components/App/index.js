import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import './style.css';
import Login from '../Login';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className="App-navbar">
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Qwestr</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Login</NavItem>
              <NavItem eventKey={2} href="#">Logout</NavItem>
            </Nav>
          </Navbar>
        </div>
        {/* <div className="App-navbar">
          {this.props.children}
        </div> */}
        <Login className="Test" />
      </div>
    );
  }
}

export default App;
