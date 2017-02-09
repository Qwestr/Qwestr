import firebase from 'firebase'

export default class UserQwestList {
  constructor() {
    this.active = null
  }

  getAll(dataUpdateCallback) {
    // Get current user id
    const userId = firebase.auth().currentUser.uid;

    // Retrieve data from the database
    const ref = firebase.database().ref('/user-qwests/' + userId)

    ref.on('value', (data) => this.getDataSuccess(data, dataUpdateCallback))
  }

  getDataSuccess(data, dataUpdateCallback) {
    // Update data
    this.active = data.val().active

    // Call data update callback method
    dataUpdateCallback(this)
  }
}
