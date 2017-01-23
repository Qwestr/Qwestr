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

  // create Qwest and UserQwest objects from data
  const qwest = {
    createdBy: userId,
    title: qwestData.title,
    completed: true
  }

  const userQwest = {
    title: qwestData.title
  }

  // Write the new Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key] = qwest;
  updates['/user-qwests/' + userId + '/active/' + key] = null;
  updates['/user-qwests/' + userId + '/completed/' + key] = userQwest;

  // update the database
  return firebase.database().ref().update(updates);
}

export function restartQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

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
  updates['/qwests/' + key] = qwest;
  updates['/user-qwests/' + userId + '/completed/' + key] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = userQwest;

  // update the database
  return firebase.database().ref().update(updates);
}

export function assignQwest(qwestData, key, assignedUserId, successCallback) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // create UserQwest object from data
  const userQwest = {
    assignedBy: assignedUserId,
    title: qwestData.title
  }

  // Assign the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key + '/assignedTo/'] = assignedUserId;
  updates['/user-qwests/' + userId + '/active/' + key + '/assignedTo/'] = assignedUserId;
  updates['/user-qwests/' + assignedUserId + '/pending/' + key] = userQwest;

  // update the database
  return firebase.database().ref().update(updates).then(successCallback);
}

export function deleteQwest(key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Delete the Qwest and UserQwest's data simultaneously
  let updates = {};
  updates['/qwests/' + key] = null;
  updates['/user-qwests/' + userId + '/active/' + key] = null;
  updates['/user-qwests/' + userId + '/completed/' + key] = null;

  // update the database
  return firebase.database().ref().update(updates);
}
