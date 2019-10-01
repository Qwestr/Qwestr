import React, { useState } from 'react'
import Aux from 'react-aux'

const QwestForm = (props) => {
  const [name, setName] = useState(null)

  const onSubmit = () => {
    // Check that the form is valid
    if (name) {
      props.onSubmit({
        name: name
      })
    }
  }

  return (
    <Aux>
      <input type="text" onChange={(event) => setName(event.target.value)}></input>
      <button onClick={onSubmit}>Submit</button>
    </Aux>
  )
}

export default QwestForm
