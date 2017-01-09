import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

export default class NotFound extends Component {
  render() {
    // declare relevant properties as local variables
    const { className, ..._props } = this.props;

    // render the veiw
    return (
      <div className={classnames('NotFound', className)}>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    );
  }
}
