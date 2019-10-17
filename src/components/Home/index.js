import React, { Component } from 'react'

import { withAuthorization } from '../Session'
import { withFirebase } from '../Firebase'

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Messages />
  </div>
)

class MessagesBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    // Setup listener to the collection
    this.unsubscribe = this.props.firebase.messages().onSnapshot(snapshot => {
      this.setState({
        messages: snapshot.docs,
        loading: false,
      })
    })
  }

  componentWillUnmount() {
    // Unsubscribe to collection listener
    this.unsubscribe()
  }

  render() {
    const { messages, loading } = this.state
    return (
      <div>
        {loading && <div>Loading ...</div>}
        {!loading ? (
          messages.length ? (
            <MessageList messages={messages} />
          ) : (
            <div>There are no messages!</div>
          )
        ) : null}
      </div>
    )
  }
}

const Messages = withFirebase(MessagesBase)

const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <MessageItem key={message.uid} message={message} />
    ))}{' '}
  </ul>
)
const MessageItem = ({ message }) => (
  <li>
    <strong>{message.userId}</strong> {message.text}
  </li>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)
