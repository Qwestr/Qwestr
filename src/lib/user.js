import firebase from 'firebase';

export function createUser(currentUser, credential, successCallback) {
  // Get current user id
  const userId = currentUser.uid;

  // Update User object with relevant credential data
  let updates = {};
  for (const provider of currentUser.providerData) {
    if (credential.provider===provider.providerId && provider.providerId==='facebook.com') {
      updates['/users/' + userId + '/credentials/Facebook'] = {
        id: provider.uid,
        accessToken: credential.accessToken
      }
    } else if (credential.provider===provider.providerId && provider.providerId==='google.com') {
      updates['/users/' + userId + '/credentials/Google']  = {
        id: provider.uid,
        accessToken: credential.accessToken
      }
    }
  }

  // Update the database
  return firebase.database().ref().update(updates, function(value) {
    // call success callback
    successCallback();
  });
}

export function getCurrentUserInfo(successCallback) {
  // Get current user id
  const userId = firebase.auth().currentUser.uid;

  // retrieve date from the database
  firebase.database().ref('/users/' + userId).once('value').then(successCallback);
}

export function getUserInfo(userData, successCallback) {
  console.log('userData: ' + JSON.stringify(userData));
  // Get user id
  // const userId = firebase.auth().currentUser.uid;
  //
  // // retrieve date from the database
  // firebase.database().ref('/users/' + userId).once('value').then(successCallback);
}
