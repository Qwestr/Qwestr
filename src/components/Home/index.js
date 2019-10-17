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
      text: '',
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

  onChangeText = event => {
    this.setState({ text: event.target.value })
  }

  onCreateMessage = event => {
    this.props.firebase.messages().add({
      text: this.state.text,
    })
    this.setState({ text: '' })
    event.preventDefault()
  }

  render() {
    const { text, messages, loading } = this.state

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
        <form onSubmit={this.onCreateMessage}>
          <input type="text" value={text} onChange={this.onChangeText} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

const Messages = withFirebase(MessagesBase)

const MessageList = ({ messages }) => (
  <ul>
    {messages.map(message => (
      <MessageItem key={message.id} message={message} />
    ))}{' '}
  </ul>
)
const MessageItem = ({ message }) => (
  <li>
    {/* <strong>{message.userId}</strong> {message.text} */}
    {message.data().text}
  </li>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)
