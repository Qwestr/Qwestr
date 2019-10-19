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
      userId: authUser.uid,
      text: this.state.text,
      createdAt: this.props.firebase.serverValues.serverTimestamp(),
    })
    this.setState({ text: '' })
    event.preventDefault()
  }

  onEditMessage = (message, text) => {
    this.props.firebase.message(message.id).set({
      ...message.data(),
      text,
      editedAt: this.props.firebase.serverValues.serverTimestamp(),
    })
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
                  authUser={authUser}
                  messages={messages}
                  onEditMessage={this.onEditMessage}
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

const MessageList = ({
  authUser,
  messages,
  onEditMessage,
  onRemoveMessage,
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.id}
        authUser={authUser}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
      />
    ))}{' '}
  </ul>
)

class MessageItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      editText: this.props.message.text,
    }
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.data().text,
    }))
  }

  onChangeEditText = event => {
    this.setState({ editText: event.target.value })
  }

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText)
    this.setState({ editMode: false })
  }

  render() {
    const { authUser, message, onRemoveMessage } = this.props
    const { editMode, editText } = this.state

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.data().userId}</strong> {message.data().text}
            {message.data().editedAt && <span>(Edited)</span>}
          </span>
        )}
        {authUser.uid === message.data().userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}
            {!editMode && (
              <button type="button" onClick={() => onRemoveMessage(message.id)}>
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    )
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage)
