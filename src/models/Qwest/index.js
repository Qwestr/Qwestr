import firebase from 'firebase'

export class UserQwest {
  constructor(props) {
    this.assignedTo = props.assignedTo || null
    this.title = props.title || null
  }
}

export class AssignedUserQwest {
  constructor(props) {
    this.assignedBy = props.createdBy || null
    this.title = props.title || null
  }
}

export class AssigningUserQwest {
  constructor(props) {
    this.assignedTo = props.assignedTo || null
    this.accepted = props.accepted || null
    this.title = props.title || null
  }
}

export default class Qwest {
  constructor(props) {
    this.createdBy = props.createdBy || firebase.auth().currentUser.uid
    this.assignedTo = props.assignedTo || null
    this.accepted = props.accepted || null
    this.completed = props.completed || null
    this.title = props.title || null
  }

  create(successCallback) {
    // Get a key for a new Qwest
    var newQwestKey = firebase.database().ref().child('qwests').push().key

    // Create UserQwest object from properties
    const userQwest = new UserQwest(this)

    // Prepare updates
    let updates = {}
    updates['/qwests/' + newQwestKey] = this
    updates['/user-qwests/' + this.createdBy + '/active/' + newQwestKey] = userQwest

    // Update the database
    return firebase.database().ref().update(updates).then(successCallback)
  }
}