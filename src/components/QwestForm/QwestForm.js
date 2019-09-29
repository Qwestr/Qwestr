import React from 'react'

const QwestForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default QwestForm
