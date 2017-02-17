import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { browserHistory } from 'react-router'
import UserManager from '../../managers/User'
import firebaseConfig from '../../../firebase.json'

export function startFirebaseUI(containerID, signInSuccessCallback) {
  // FirebaseUI config.
  let uiConfig = {
    callbacks: {
      signInSuccess: signInSuccessCallback
    },
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          'user_friends'
        ]
      }
      // TODO: Implement Google Login
      // },
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  }

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth())

  // The start method will wait until the DOM is loaded.
  ui.start(containerID, uiConfig)
}

export function validateUserVersion(user) {
  // Get User data
  new UserManager().getUser(user, (data) => {
    // get User version
    const version = data.val()._version

    // logout the User if the version is not present/ invalid
    if (!version || version !== firebaseConfig.version.user) {
      logout()
    }
  })
}

export function logout() {
  firebase.auth().signOut().then(function() {
    // Redirect to login
    browserHistory.push('/login')
  }, function(error) {
    // Present alert
    alert('Error: ' + error)
  })
}
