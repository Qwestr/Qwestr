import React, { Component } from 'react'
import classnames from 'classnames'
import './style.css'

class Home extends Component {
  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props

    // render the veiw
    return (
      <div className={classnames('Home', className)}>
        <div className="jumbotron">
          <h2>Welcome to Qwestr!</h2>
          <p className="lead">Let the games begin.</p>
        </div>
      </div>
    )
  }
}

export default Home
