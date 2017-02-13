import firebase from 'firebase'

export default class QwestManager {
  constructor(props = {}) {
    this.userQwests = props.userQwests || {}
  }

  getAllUserQwests(updateCallback) {
    // Get the current User ID
    const userId = firebase.auth().currentUser.uid

    // Set the reference path for where to retrieve the data
    const ref = firebase.database().ref('/user-qwests/' + userId)

    // Setup a listener for data changes at the reference path
    ref.on('value', (data) => {
      this.getAllUserQwestsCallback(data, updateCallback)
    })
  }

  getAllUserQwestsCallback(data, updateCallback) {
    // Update data
    this.userQwests.active = data.val().active
    this.userQwests.assigned = data.val().assigned
    this.userQwests.shared = data.val().shared
    this.userQwests.completed = data.val().completed
    this.userQwests.pending = data.val().pending

    // Call the update callback method
    updateCallback(this.userQwests)
  }
}
