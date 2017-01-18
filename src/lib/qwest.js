import firebase from 'firebase';

export function createQwest(qwestData) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // Get a key for a new Qwest.
  var newQwestKey = firebase.database().ref().child('qwests').push().key;

  // Write the new Qwest's data simultaneously
  // in the Qwests list and the User's Qwest list.
  let updates = {};
  updates['/qwests/' + newQwestKey] = qwestData;
  updates['/user-qwests/' + userId + '/' + newQwestKey] = qwestData;

  // update the database
  return firebase.database().ref().update(updates);
}

export function completeQwest(qwestData, key) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // update Qwest data
  qwestData.completed = true;

  // Write the new Qwest's data simultaneously
  // in the Qwests list and the user's Qwest list.
  let updates = {};
  updates['/qwests/' + key] = qwestData;
  updates['/user-qwests/' + userId + '/' + key] = qwestData;

  // update the database
  return firebase.database().ref().update(updates);
}

export function getUserQwests(successCallback) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // retrieve date from the database
  firebase.database().ref('/user-qwests/' + userId).once('value').then(successCallback);
}
