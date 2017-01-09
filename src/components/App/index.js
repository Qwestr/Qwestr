import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import classnames from 'classnames';
import './style.css';

class App extends Component {
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
            <Nav>
              <NavItem href="/qwest/new">New Qwest</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="/login">Login</NavItem>
              <NavItem href="/logout">Logout</NavItem>
            </Nav>
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
