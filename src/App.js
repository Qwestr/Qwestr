import React from 'react'
import Aux from 'react-aux'

import QwestForm from './components/QwestForm/QwestForm'

const App = () => {
  const onSubmit = () => {
    console.log('form submitted!')
  }

  return (
    <Aux>
      <QwestForm onSubmit={onSubmit}></QwestForm>
    </Aux>
  )
}

export default App
