import firebase from 'firebase';

export function createUser(currentUser, credential, successCallback) {
  // Get current user id
  const userId = currentUser.uid;

  // Update User object with relevant credential data
  let updates = {};
  for (const provider of currentUser.providerData) {
    if (credential.provider===provider.providerId && provider.providerId==='facebook.com') {
      updates['/users/general/' + userId + '/credentials/Facebook'] = {
        id: provider.uid,
        accessToken: credential.accessToken
      };
      updates['/users/social/Facebook/' + provider.uid] = {
        userId: userId
      };
    } else if (credential.provider===provider.providerId && provider.providerId==='google.com') {
      updates['/users/general/' + userId + '/credentials/Google']  = {
        id: provider.uid,
        accessToken: credential.accessToken
      };
      updates['/users/social/Google/' + provider.uid] = {
        userId: userId
      };
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
  firebase.database().ref('/users/general/' + userId).once('value').then(successCallback);
}

export function getUserInfo(userData, successCallback) {
  // Get user id
  const userId = userData.id;

  // retrieve date from the database
  firebase.database().ref('/users/social/Facebook/' + userId).once('value').then(successCallback);
}
