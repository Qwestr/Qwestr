import firebase from 'firebase'
import Qwest from '../Qwest'
import UserQwest from '../UserQwest'

export default class UserQwestList {
  constructor() {
    this.active = null
    this.assigned = null
    this.shared = null
    this.completed = null
    this.pending = null
  }

  getAll(dataUpdateCallback) {
    // Get current user id
    const userId = firebase.auth().currentUser.uid

    // Retrieve data from the database
    const ref = firebase.database().ref('/user-qwests/' + userId)

    ref.on('value', (data) => this.getDataSuccess(data, dataUpdateCallback))
  }

  getDataSuccess(data, dataUpdateCallback) {
    // Update data
    this.active = data.val().active
    this.assigned = data.val().assigned
    this.shared = data.val().shared
    this.completed = data.val().completed
    this.pending = data.val().pending

    // Call data update callback method
    dataUpdateCallback(this)
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
      delete userQwest.assignedBy
      delete assignedUserQwest.assignedTo

      // Write the new Qwest and UserQwest's data simultaneously
      let updates = {}
      updates['/qwests/' + key] = qwest
      if (qwest.assignedTo) {
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = userQwest
        updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = null
        updates['/user-qwests/' + qwest.assignedTo + '/completed/' + key] = assignedUserQwest
        updates['/user-qwests/' + qwest.assignedTo + '/active/' + key] = null
      } else {
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = userQwest
        updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = null
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
      delete userQwest.assignedBy
      delete assignedUserQwest.assignedTo

      // Write the new Qwest and UserQwest's data simultaneously
      let updates = {}
      updates['/qwests/' + key] = qwest
      if (qwest.assignedTo) {
        updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = userQwest
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = null
        updates['/user-qwests/' + qwest.assignedTo + '/active/' + key] = assignedUserQwest
        updates['/user-qwests/' + qwest.assignedTo + '/completed/' + key] = null
      } else {
        updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
        updates['/user-qwests/' + qwest.createdBy + '/completed/' + key] = null
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  assign(key, assignedUserId, successCallback) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())
      const assignedUserQwest = new UserQwest(data.val())

      // Get currently assigined user id
      const currentAssignedUserId = qwest.assignedTo || null

      // If the Qwest is already assigned to the same user, return without updating
      if (currentAssignedUserId === assignedUserId) {
        return successCallback()
      }

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.accepted
      qwest.assignedTo = assignedUserId
      delete userQwest.assignedBy
      userQwest.assignedTo = assignedUserId
      delete assignedUserQwest.assignedTo
      assignedUserQwest.assignedBy = qwest.createdBy

      // Write the Qwest and UserQwest's data simultaneously
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = userQwest
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = null
      updates['/user-qwests/' + qwest.assignedTo + '/pending/' + key] = assignedUserQwest
      if (currentAssignedUserId) {
        updates['/user-qwests/' + currentAssignedUserId + '/active/' + key] = null
        updates['/user-qwests/' + currentAssignedUserId + '/pending/' + key] = null
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  accept(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())
      const acceptedUserQwest = new UserQwest(data.val())

      //   // Get assiging user id
      //   const assigningUserId = qwestData.assignedBy || null;
      //
      //   // create Accepted Qwest object from data
      //   const acceptedQwest = {
      //     assignedBy: qwestData.assignedBy,
      //     title: qwestData.title
      //   }
      //
      //   // Assign the Qwest and UserQwest's data simultaneously
      //   let updates = {};
      //   updates['/qwests/' + key + '/accepted'] = true;
      //   updates['/user-qwests/' + assigningUserId + '/assigned/' + key + '/accepted'] = true;
      //   updates['/user-qwests/' + userId + '/pending/' + key] = null;
      //   updates['/user-qwests/' + userId + '/active/' + key] = acceptedQwest;

      // Update/ Modify Qwest/ UserQwest objects
      qwest.accepted = true
      delete userQwest.assignedBy
      userQwest.assignedTo = assignedUserId
      delete assignedUserQwest.assignedTo
      assignedUserQwest.assignedBy = qwest.createdBy

      // Write the Qwest and UserQwest's data simultaneously
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = userQwest
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = null
      updates['/user-qwests/' + qwest.assignedTo + '/pending/' + key] = assignedUserQwest
      if (currentAssignedUserId) {
        updates['/user-qwests/' + currentAssignedUserId + '/active/' + key] = null
        updates['/user-qwests/' + currentAssignedUserId + '/pending/' + key] = null
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  // export function acceptQwest(qwestData, key) {
  //   // Get current user id
  //   const userId = firebase.auth().currentUser.uid;
  //
  //   // Get assiging user id
  //   const assigningUserId = qwestData.assignedBy || null;
  //
  //   // create Accepted Qwest object from data
  //   const acceptedQwest = {
  //     assignedBy: qwestData.assignedBy,
  //     title: qwestData.title
  //   }
  //
  //   // Assign the Qwest and UserQwest's data simultaneously
  //   let updates = {};
  //   updates['/qwests/' + key + '/accepted'] = true;
  //   updates['/user-qwests/' + assigningUserId + '/assigned/' + key + '/accepted'] = true;
  //   updates['/user-qwests/' + userId + '/pending/' + key] = null;
  //   updates['/user-qwests/' + userId + '/active/' + key] = acceptedQwest;
  //
  //   // update the database
  //   return firebase.database().ref().update(updates);
  // }
}
