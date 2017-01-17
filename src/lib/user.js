import firebase from 'firebase';

export function createUser(currentUser, credential, successCallback) {
  // Get current user id
  const userId = currentUser.uid;

  // Create User object
  let userData = {
    credentials: {}
  };

  // Update User objects with relevant credential data
  for (const provider of currentUser.providerData) {
    if (provider.providerId==='facebook.com') {
      userData.credentials.Facebook = {
        id: provider.uid,
        accessToken: credential.accessToken
      }
    }
  }

  // Write the new User's data
  let updates = {};
  updates['/users/' + userId] = userData;

  // update the database
  return firebase.database().ref().update(updates, function(value) {
    // call success callback
    successCallback();
  });
}
