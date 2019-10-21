import React from 'react'
import Aux from 'react-aux'

import QwestList from './list'
import QwestCreate from './create'

const Qwests = () => {
  // Return component
  return (
    <Aux>
      <QwestCreate />
      <QwestList />
    </Aux>
  )
}

export default Qwests
