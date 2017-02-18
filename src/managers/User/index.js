import firebase from 'firebase'
import User, { SocialUser } from '../../models/User'

export default class UserManager {
  getUser(userData, successCallback) {
    // Retrieve data from the database
    firebase.database().ref('/users/general/' + userData.uid).once('value').then(successCallback)
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

      // Update User data
      user.update(userData)

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

  getSocialUser(userData, successCallback) {
    // retrieve date from the database
    firebase.database().ref('/users/social/Facebook/' + userData.id).once('value').then(successCallback)
  }
}
