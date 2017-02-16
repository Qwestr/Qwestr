import firebase from 'firebase'

export default class User {
  constructor(props) {
    this.uid = props.uid
    this.displayName = props.displayName
    this.photoURL = props.photoURL
  }

  create(successCallback) {
    // Get a key for a new Qwest
    var newQwestKey = firebase.database().ref().child('qwests').push().key

    // Create UserQwest object from properties
    // const userQwest = new UserQwest(this);

    // Prepare updates
    let updates = {}
    updates['/qwests/' + newQwestKey] = this
    // updates['/user-qwests/' + this.createdBy + '/active/' + newQwestKey] = userQwest

    // Update the database
    return firebase.database().ref().update(updates).then(successCallback)
  }

  update(successCallback) {
    // Get a key for a new Qwest
    var newQwestKey = firebase.database().ref().child('qwests').push().key

    // Create UserQwest object from properties
    // const userQwest = new UserQwest(this);

    // Prepare updates
    let updates = {}
    updates['/qwests/' + newQwestKey] = this
    // updates['/user-qwests/' + this.createdBy + '/active/' + newQwestKey] = userQwest

    // Update the database
    return firebase.database().ref().update(updates).then(successCallback)
  }
}

// export function createUser(currentUser, credential, successCallback) {
//   // Get current user id
//   const userId = currentUser.uid;
//
//   // Update User object with relevant credential data
//   let updates = {};
//   for (const provider of currentUser.providerData) {
//     if (credential.provider===provider.providerId && provider.providerId==='facebook.com') {
//       updates['/users/general/' + userId + '/credentials/Facebook'] = {
//         id: provider.uid,
//         accessToken: credential.accessToken
//       };
//       updates['/users/social/Facebook/' + provider.uid] = {
//         userId: userId
//       };
//     } else if (credential.provider===provider.providerId && provider.providerId==='google.com') {
//       updates['/users/general/' + userId + '/credentials/Google']  = {
//         id: provider.uid,
//         accessToken: credential.accessToken
//       };
//       updates['/users/social/Google/' + provider.uid] = {
//         userId: userId
//       };
//     }
//   }
//
//   // Update the database
//   return firebase.database().ref().update(updates, function(value) {
//     // call success callback
//     successCallback();
//   });
// }
//
// export function getCurrentUserInfo(successCallback) {
//   // Get current user id
//   const userId = firebase.auth().currentUser.uid;
//
//   // retrieve date from the database
//   firebase.database().ref('/users/general/' + userId).once('value').then(successCallback);
// }
//
// export function getUserInfo(userData, successCallback) {
//   // Get user id
//   const userId = userData.id;
//
//   // retrieve date from the database
//   firebase.database().ref('/users/social/Facebook/' + userId).once('value').then(successCallback);
// }
