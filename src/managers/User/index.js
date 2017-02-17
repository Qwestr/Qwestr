import firebase from 'firebase'
import User, { SocialUser } from '../../models/User'

export default class UserManager {
  getUser(userData, successCallback) {
    // Retrieve date from the database
    firebase.database().ref('/users/general/' + userData.uid).once('value').then(successCallback);
  }

  updateUser(userData, credentials, successCallback) {
    // Get current User
    this.getUser(userData, (data) => {
      let user = null
      // If User does not yet exist, create it
      // Otherwise, create User from returned data
      if (!data.val()) {
        user = new User(userData)
      } else {
        user = new User(data.val())
      }

      // Update User credentials
      user.updateCredentials(userData.providerData, credentials)

      // Get SocialUser object data
      const socialUserData = this.getSocialUserData(userData)

      // Prepare updates for User/ SocialUser data
      let updates = {}
      updates['/users/general/' + userData.uid] = user
      for (const provider of Object.keys(socialUserData)) {
        updates['/users/social/' + provider + '/' + socialUserData[provider].uid] = socialUserData[provider].data
      }

      // Update the database
      return firebase.database().ref().update(updates).then(successCallback)
    })
  }

  getSocialUserData(userData) {
    let socialUsers = {}

    // Get data for each Social provider
    for (const provider of userData.providerData) {
      if (provider.providerId==='facebook.com') {
        socialUsers['Facebook'] = {
          uid: provider.uid,
          data: new SocialUser(userData)
        }
      } else if (provider.providerId==='google.com') {
        socialUsers['Google'] = {
          uid: provider.uid,
          data: new SocialUser(userData)
        }
      }
    }

    return socialUsers
  }
    // Create User object
    // const user = new User(userData)



    // Get current User ID
    // const userId = currentUser.uid;

    // Update User object with relevant credential data
    // let updates = {};
    // for (const provider of currentUser.providerData) {
    //   if (credential.provider===provider.providerId && provider.providerId==='facebook.com') {
    //     updates['/users/general/' + userId + '/credentials/Facebook'] = {
    //       id: provider.uid,
    //       accessToken: credential.accessToken
    //     };
    //     updates['/users/social/Facebook/' + provider.uid] = {
    //       userId: userId
    //     };
    //   } else if (credential.provider===provider.providerId && provider.providerId==='google.com') {
    //     updates['/users/general/' + userId + '/credentials/Google']  = {
    //       id: provider.uid,
    //       accessToken: credential.accessToken
    //     };
    //     updates['/users/social/Google/' + provider.uid] = {
    //       userId: userId
    //     };
      // }
    // }

    // updateUser() {
    //
    // }
    //
    // getUser() {
    //
    // }

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
}
