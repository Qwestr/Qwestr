import React, { Component } from 'react';
import classnames from 'classnames';
import logo from './logo.svg';
import './style.css';

class App extends Component {
  render() {
    const { className, ..._props } = this.props;

    return (
      <div className={classnames('App', className)}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Qwestr</h2>
        </div>
      </div>
    );
  }
}

export default App;
