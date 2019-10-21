import React from 'react'
import Aux from 'react-aux'
import { compose } from 'recompose'

import { withAuthorization, withEmailVerification } from '../Session'
import QwestList from './list'
import QwestCreate from './create'

const QwestsPage = props => {
  // Return component
  return (
    <Aux>
      <QwestCreate store={props.firebase} />
      <QwestList store={props.firebase} />
    </Aux>
  )
}

const condition = authUser => !!authUser

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(QwestsPage)
