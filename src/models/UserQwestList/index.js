import firebase from 'firebase'
import Qwest from '../Qwest'
import UserQwest from '../UserQwest'

export default class UserQwestList {
  constructor() {
    this.active = null
    this.completed = null
  }

  getDataSuccess(data, dataUpdateCallback) {
    // Update data
    this.active = data.val().active
    this.completed = data.val().completed

    // Call data update callback method
    dataUpdateCallback(this)
  }

  getAll(dataUpdateCallback) {
    // Get current user id
    const userId = firebase.auth().currentUser.uid

    // Retrieve data from the database
    const ref = firebase.database().ref('/user-qwests/' + userId)

    ref.on('value', (data) => this.getDataSuccess(data, dataUpdateCallback))
  }

  getQwest(key, dataReceivedCallback) {
    // Retrieve Qwest data from the database
    const ref = firebase.database().ref('/qwests/' + key)

    ref.once('value').then(dataReceivedCallback)
  }

  complete(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())
      const assignedUserQwest = new UserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      qwest.completed = true
      userQwest.assignedBy = null
      assignedUserQwest.assignedTo = null

      // Write the new Qwest and UserQwest's data simultaneously
      let updates = {}
      updates['/qwests/' + key] = qwest
      if (qwest.assignedTo) {
        updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = null
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = userQwest
        updates['/user-qwests/' + qwest.assignedTo + '/active/' + key] = null
        updates['/user-qwests/' + qwest.assignedTo + '/completed/' + key] = assignedUserQwest
      } else {
        updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = null
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = userQwest
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  restart(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())
      const assignedUserQwest = new UserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.completed
      userQwest.assignedBy = null
      assignedUserQwest.assignedTo = null

      // Write the new Qwest and UserQwest's data simultaneously
      let updates = {};
      updates['/qwests/' + key] = qwest;
      if (qwest.assignedTo) {
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = null
        updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = userQwest
        updates['/user-qwests/' + qwest.assignedTo + '/completed/' + key] = null
        updates['/user-qwests/' + qwest.assignedTo + '/active/' + key] = assignedUserQwest
      } else {
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = null
        updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  // export function restartQwest(qwestData, key) {
  //   // Get current user id
  //   const userId = firebase.auth().currentUser.uid;
  //
  //   // Create Qwest and User Qwest objects from data
  //   const qwest = {
  //     createdBy: userId,
  //     title: qwestData.title
  //   }
  //
  //   const userQwest = {
  //     title: qwestData.title
  //   }
  //
  //   // Write the new Qwest and UserQwest's data simultaneously
  //   let updates = {};
  //   updates['/qwests/' + key] = qwest;
  //   updates['/user-qwests/' + userId + '/completed/' + key] = null;
  //   updates['/user-qwests/' + userId + '/active/' + key] = userQwest;
  //
  //   // Update the database
  //   return firebase.database().ref().update(updates);
  // }
}
