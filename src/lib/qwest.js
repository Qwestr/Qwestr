import firebase from 'firebase';

export function createQwest(qwestData, successCallback) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get a key for a new Qwest.
  var qwestKey = firebase.database().ref().child('qwests').push().key;

  // create Qwest and UserQwest objects from data
  const qwest = {
    createdBy: userId,
    title: qwestData.title
  }

  const userQwest = {
    title: qwestData.title
  }

  // Write the new Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + qwestKey] = qwest;
  updates['/user-qwests/' + userId + '/active/' + qwestKey] = userQwest;

  // update the database
  return firebase.database().ref().update(updates).then(successCallback);
}

export function getUserQwests(dataReceivedCallback) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // retrieve date from the database
  firebase.database().ref('/user-qwests/' + userId).on('value', dataReceivedCallback);
}

export function completeQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get assiging user id
  const assigningUserId = qwestData.assignedBy;

  // create Assign User Qwest and User Qwest object from data
  const assignedUserQwest = {
    assignedBy: assigningUserId,
    title: qwestData.title
  }

  const userQwest = {
    assignedTo: userId,
    title: qwestData.title
  }

  // Write the new Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/completed'] = true;
  updates['/user-qwests/' + userId + '/active/' + key] = null;
  if (assigningUserId) {
    updates['/user-qwests/' + assigningUserId + '/assigned/' + key] = null;
    updates['/user-qwests/' + assigningUserId + '/completed/' + key] = userQwest;
    updates['/user-qwests/' + userId + '/completed/' + key] = assignedUserQwest;
  } else {
    updates['/user-qwests/' + userId + '/completed/' + key] = userQwest;
  }

  // update the database
  return firebase.database().ref().update(updates);
}

export function restartQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // create Qwest and User Qwest objects from data
  const qwest = {
    createdBy: userId,
    title: qwestData.title
  }

  const userQwest = {
    title: qwestData.title
  }

  // Write the new Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key] = qwest;
  updates['/user-qwests/' + userId + '/completed/' + key] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = userQwest;

  // update the database
  return firebase.database().ref().update(updates);
}

export function assignQwest(qwestData, key, assignedUserId, successCallback) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // create Pending Qwest and User Qwest objects from data
  const pendingQwest = {
    assignedBy: userId,
    title: qwestData.title
  }

  const userQwest = {
    assignedTo: assignedUserId,
    title: qwestData.title
  }

  // Assign the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/assignedTo'] = assignedUserId;
  updates['/user-qwests/' + userId + '/active/' + key] = null;
  updates['/user-qwests/' + userId + '/assigned/' + key] = userQwest;
  updates['/user-qwests/' + assignedUserId + '/pending/' + key] = pendingQwest;

  // update the database
  return firebase.database().ref().update(updates).then(successCallback);
}

export function acceptQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get assiging user id
  const assigningUserId = qwestData.assignedBy;

  // create Accepted Qwest object from data
  const acceptedQwest = {
    assignedBy: qwestData.assignedBy,
    title: qwestData.title
  }

  // Assign the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/accepted'] = true;
  updates['/user-qwests/' + assigningUserId + '/assigned/' + key + '/accepted'] = true;
  updates['/user-qwests/' + userId + '/pending/' + key] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = acceptedQwest;

  // update the database
  return firebase.database().ref().update(updates);
}

export function removeQwest(key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Remove the Qwest from the User's completed Qwest list
  let updates = {};
  updates['/user-qwests/' + userId + '/completed/' + key] = null;

  // update the database
  return firebase.database().ref().update(updates);
}

export function revokeQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get assiged user id
  const assignedUserId = qwestData.assignedTo;

  // create Active Qwest object from data
  const activeQwest = {
    title: qwestData.title
  }

  // Revoke the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/assignedTo'] = null;
  updates['/qwests/' + key + '/accepted'] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = activeQwest;
  updates['/user-qwests/' + userId + '/assigned/' + key] = null;
  updates['/user-qwests/' + userId + '/completed/' + key] = null;
  updates['/user-qwests/' + assignedUserId + '/active/' + key] = null;
  updates['/user-qwests/' + assignedUserId + '/completed/' + key] = null;
  updates['/user-qwests/' + assignedUserId + '/pending/' + key] = null;

  // update the database
  return firebase.database().ref().update(updates);
}

export function rejectQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get assigning user id
  const assigningUserId = qwestData.assignedBy;

  // create Active Qwest object from data
  const activeQwest = {
    title: qwestData.title
  }

  // Reject the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/assignedTo'] = null;
  updates['/user-qwests/' + userId + '/pending/' + key] = null;
  updates['/user-qwests/' + assigningUserId + '/assigned/' + key] = null;
  updates['/user-qwests/' + assigningUserId + '/active/' + key] = activeQwest;

  // update the database
  return firebase.database().ref().update(updates);
}

export function dropQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get assigning user id
  const assigningUserId = qwestData.assignedBy;

  // create Active Qwest object from data
  const activeQwest = {
    title: qwestData.title
  }

  // Reject the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/assignedTo'] = null;
  updates['/qwests/' + key + '/accepted'] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = null;
  updates['/user-qwests/' + assigningUserId + '/assigned/' + key] = null;
  updates['/user-qwests/' + assigningUserId + '/active/' + key] = activeQwest;

  // update the database
  return firebase.database().ref().update(updates);
}

export function deleteQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get assiged user id
  const assignedUserId = qwestData.assignedTo;

  // Delete the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = null;
  updates['/user-qwests/' + userId + '/assigned/' + key] = null;
  updates['/user-qwests/' + userId + '/completed/' + key] = null;
  updates['/user-qwests/' + userId + '/pending/' + key] = null;
  if (assignedUserId) {
    updates['/user-qwests/' + assignedUserId + '/active/' + key] = null;
    updates['/user-qwests/' + assignedUserId + '/assigned/' + key] = null;
    updates['/user-qwests/' + assignedUserId + '/completed/' + key] = null;
    updates['/user-qwests/' + assignedUserId + '/pending/' + key] = null;
  }

  // update the database
  return firebase.database().ref().update(updates);
}
