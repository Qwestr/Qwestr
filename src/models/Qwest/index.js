import firebase from 'firebase'
import UserQwest from '../UserQwest'

export default class Qwest {
  constructor(props) {
    this.createdBy = firebase.auth().currentUser.uid
    this.title = props.title
  }

  create(successCallback) {
    // Get a key for a new Qwest
    var newQwestKey = firebase.database().ref().child('qwests').push().key

    // Create UserQwest object from properties
    const userQwest = new UserQwest(this);

    // Prepare updates
    let updates = {}
    updates['/qwests/' + newQwestKey] = this
    updates['/user-qwests/' + this.createdBy + '/active/' + newQwestKey] = userQwest

    // Update the database
    return firebase.database().ref().update(updates).then(successCallback)
  }
}
