import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import classnames from 'classnames';
import './style.css';

class App extends Component {
  render() {
    const { className, ..._props } = this.props;

    return (
      <div className={classnames('App', className)}>
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
      </div>
    );
  }
}

export default App;
