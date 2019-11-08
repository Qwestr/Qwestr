import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { browserHistory } from 'react-router'

export function startFirebaseUI(containerId, signInSuccessCallback) {
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
  ui.start(containerId, uiConfig)
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
