import React, { Component } from 'react'

import { AuthUserContext, withAuthorization } from '../Session'
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

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().add({
      text: this.state.text,
      userId: authUser.uid,
    })
    this.setState({ text: '' })
    event.preventDefault()
  }

  onRemoveMessage = id => {
    this.props.firebase.message(id).delete()
  }

  render() {
    const { text, messages, loading } = this.state

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}
            {!loading ? (
              messages.length ? (
                <MessageList
                  messages={messages}
                  onRemoveMessage={this.onRemoveMessage}
                />
              ) : (
                <div>There are no messages!</div>
              )
            ) : null}
            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input type="text" value={text} onChange={this.onChangeText} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const Messages = withFirebase(MessagesBase)

const MessageList = ({ messages, onRemoveMessage }) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.id}
        message={message}
        onRemoveMessage={onRemoveMessage}
      />
    ))}{' '}
  </ul>
)

const MessageItem = ({ message, onRemoveMessage }) => (
  <li>
    <strong>{message.data().userId}</strong> {message.data().text}
    <button type="button" onClick={() => onRemoveMessage(message.id)}>
      Delete
    </button>
  </li>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)
