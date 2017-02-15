import firebase from 'firebase'
import Qwest, {
  UserQwest, AssignedUserQwest, AssigningUserQwest, SharedUserQwest
} from '../../models/Qwest'

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
      const assignedUserQwest = new AssignedUserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      qwest.completed = true

      // Prepare updates for Qwest/ UserQwest data
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
      const assignedUserQwest = new AssignedUserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.completed

      // Prepare updates for Qwest/ UserQwest data
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
      const assignedUserQwest = new AssignedUserQwest(data.val())

      // Get currently assigned User ID
      const currentAssignedUserId = qwest.assignedTo || null

      // If the Qwest is already assigned to the same user, return without updating
      if (currentAssignedUserId === assignedUserId) {
        return successCallback()
      }

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.accepted
      qwest.assignedTo = assignedUserId
      userQwest.assignedTo = assignedUserId

      // Prepare updates for Qwest/ UserQwest data
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
      return firebase.database().ref().update(updates).then(successCallback)
    })
  }

  accept(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const assignedUserQwest = new AssignedUserQwest(data.val())
      const assigningUserQwest = new AssigningUserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      qwest.accepted = true
      assigningUserQwest.accepted = true

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = assigningUserQwest
      updates['/user-qwests/' + qwest.assignedTo + '/active/' + key] = assignedUserQwest
      updates['/user-qwests/' + qwest.assignedTo + '/pending/' + key] = null

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  reject(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())

      // Get assigned User ID
      const assignedUserId = qwest.assignedTo

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.assignedTo
      delete userQwest.assignedTo

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + assignedUserId + '/pending/' + key] = null
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
      updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = null

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  revoke(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())

      // Get assigned User ID
      const assignedUserId = qwest.assignedTo

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.assignedTo
      delete qwest.accepted
      delete userQwest.assignedTo

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + assignedUserId + '/active/' + key] = null
      updates['/user-qwests/' + assignedUserId + '/pending/' + key] = null
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
      updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = null

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  share(key, sharedUserId, successCallback) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())
      const sharedUserQwest = new SharedUserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      qwest.sharedWith[sharedUserId] = true
      userQwest.sharedWith[sharedUserId] = true

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
      updates['/user-qwests/' + sharedUserId + '/shared/' + key] = sharedUserQwest

      // Update the database
      return firebase.database().ref().update(updates).then(successCallback)
    })
  }

  dropAssigned(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())

      // Get assigned User ID
      const assignedUserId = qwest.assignedTo

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.assignedTo
      delete qwest.accepted
      delete userQwest.assignedTo

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + assignedUserId + '/active/' + key] = null
      updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
      updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = null

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  dropShared(key, sharedUserId) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())
      const userQwest = new UserQwest(data.val())

      // Update/ Modify Qwest/ UserQwest objects
      delete qwest.sharedWith[sharedUserId]
      delete userQwest.sharedWith[sharedUserId]

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/qwests/' + key] = qwest
      updates['/user-qwests/' + sharedUserId + '/shared/' + key] = null
      if (qwest.assignedTo) {
        updates['/user-qwests/' + qwest.createdBy + '/assigned/' + key] = userQwest
      } else {
        updates['/user-qwests/' + qwest.createdBy + '/active/' + key] = userQwest
      }

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  remove(key) {
    this.getQwest(key, (data) => {
      // Create Qwest/ UserQwest objects from data
      const qwest = new Qwest(data.val())

      // Prepare updates for Qwest/ UserQwest data
      let updates = {}
      updates['/user-qwests/' + qwest.assignedTo + '/completed/' + key] = null

      // Update the database
      return firebase.database().ref().update(updates)
    })
  }

  // export function deleteQwest(qwestData, key) {
  //   // Get current user id
  //   const userId = firebase.auth().currentUser.uid;
  //
  //   // Get assiged user id
  //   const assignedUserId = qwestData.assignedTo || null;
  //
  //   // Delete the Qwest and UserQwest's data simultaneously
  //   let updates = {};
  //   updates['/qwests/' + key] = null;
  //   updates['/user-qwests/' + userId + '/active/' + key] = null;
  //   updates['/user-qwests/' + userId + '/assigned/' + key] = null;
  //   updates['/user-qwests/' + userId + '/completed/' + key] = null;
  //   updates['/user-qwests/' + userId + '/pending/' + key] = null;
  //   if (assignedUserId) {
  //     updates['/user-qwests/' + assignedUserId + '/active/' + key] = null;
  //     updates['/user-qwests/' + assignedUserId + '/assigned/' + key] = null;
  //     updates['/user-qwests/' + assignedUserId + '/completed/' + key] = null;
  //     updates['/user-qwests/' + assignedUserId + '/pending/' + key] = null;
  //   }
  //
  //   // update the database
  //   return firebase.database().ref().update(updates);
  // }
}
