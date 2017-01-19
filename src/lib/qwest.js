import firebase from 'firebase';

export function createQwest(qwestData) {
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

export function getCompletedUserQwests() {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // retrieve date from the database
  firebase.database().ref('/qwests/').orderByChild('completed').equalTo(true).once('value').then(function(data) {
    console.log('result: ' + JSON.stringify(data.val()));
  });
}
