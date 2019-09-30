import React from 'react'
import Aux from 'react-aux'

import QwestForm from './components/QwestForm/QwestForm'
import QwestList from './components/QwestList/QwestList'

const App = () => {
  const onSubmit = () => {}

  return (
    <Aux>
      <QwestForm onSubmit={onSubmit}></QwestForm>
      <QwestList></QwestList>
    </Aux>
  )
}

export default App
