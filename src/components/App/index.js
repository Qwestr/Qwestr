import React, { Component } from 'react';
import classnames from 'classnames';
import NavBar from '../NavBar';
import './style.css';

class App extends Component {
  render() {
    // declare relevant properties as local variables
    const { className, children, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('App', className)}>
        <NavBar />
        <div className="App-content">
          {children}
        </div>
      </div>
    );
  }
}

export default App;
