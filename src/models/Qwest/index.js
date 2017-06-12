import 'datejs'
import Enum from 'es6-enum'
import firebase from 'firebase'

export const REPEAT_TYPE = Enum('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY')

export class UserQwest {
  constructor(props) {
    this.assignedTo = props.assignedTo || null
    this.title = props.title || null
  }

  update(qwestData) {
    // update the UserQwest
    this.title = qwestData.title
  }
}

export class AssignedUserQwest {
  constructor(props) {
    this.assignedBy = props.createdBy || null
    this.title = props.title || null
  }

  update(qwestData) {
    // update the AssignedUserQwest
    this.title = qwestData.title
  }
}

export class AssigningUserQwest {
  constructor(props) {
    this.assignedTo = props.assignedTo || null
    this.accepted = props.accepted || null
    this.title = props.title || null
  }

  update(qwestData) {
    // update the AssigningUserQwest
    this.title = qwestData.title
  }
}

export default class Qwest {
  constructor(props) {
    this.createdBy = props.createdBy || firebase.auth().currentUser.uid
    this.createdOn = props.createdOn || Date.today().setTimeToNow().toString()
    this.updatedOn = props.updatedOn || Date.today().setTimeToNow().toString()
    this.assignedTo = props.assignedTo || null
    this.accepted = props.accepted || null
    this.completed = props.completed || null
    this.completedOn = props.completedOn || null
    this.repeats = props.repeats || null
    this.title = props.title || null
    this.description = props.description || null
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

  update(qwestData) {
    // update the Qwest
    this.title = qwestData.title
    this.description = qwestData.description || null
    this.updatedOn = Date.today().setTimeToNow().toString()
  }

  complete() {
    // complete the Qwest
    this.completed = true
    this.completedOn = Date.today().setTimeToNow().toString()
    this.updatedOn = Date.today().setTimeToNow().toString()
  }
}
