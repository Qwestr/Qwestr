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
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = null
      if (qwest.assignedTo) {
        updates['/user-qwests/' + qwest.assignedBy + '/assigned/' + key] = null
        updates['/user-qwests/' + qwest.assignedBy + '/completed/' + key] = userQwest
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = assignedUserQwest
      } else {
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = userQwest
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  // export function completeQwest(qwestData, key) {
  //   // Get current user id
  //   const userId = firebase.auth().currentUser.uid
  //
  //   // Get assiging user id
  //   const assigningUserId = qwestData.assignedBy || null
  //
  //   // Get assigned user id
  //   const assignedUserId = qwestData.assignedTo || null
  //
  //   // Create Assign User Qwest and User Qwest object from data
  //   const assignedUserQwest = {
  //     assignedBy: assigningUserId,
  //     title: qwestData.title
  //   }
  //
  //   const userQwest = {
  //     assignedTo: assignedUserId,
  //     title: qwestData.title
  //   }
  //
  //   // Write the new Qwest and UserQwest's data simultaneously
  //   let updates = {}
  //   updates['/qwests/' + key + '/completed'] = true
  //   updates['/user-qwests/' + userId + '/active/' + key] = null
  //   if (assigningUserId) {
  //     updates['/user-qwests/' + assigningUserId + '/assigned/' + key] = null
  //     updates['/user-qwests/' + assigningUserId + '/completed/' + key] = userQwest
  //     updates['/user-qwests/' + userId + '/completed/' + key] = assignedUserQwest
  //   } else {
  //     updates['/user-qwests/' + userId + '/completed/' + key] = userQwest
  //   }
  //
  //   // Update the database
  //   return firebase.database().ref().update(updates)
  // }
}
