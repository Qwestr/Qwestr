import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { browserHistory } from 'react-router';

export function startFirebaseUI(containerID) {
  // FirebaseUI config.
  let uiConfig = {
    callbacks: {
      signInSuccess: function(currentUser, credential, redirectUrl) {
        console.log('fb credential: ' + JSON.stringify(credential));
        return true;
      }
    },
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        scopes: [
          'user_friends'
        ]
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start(containerID, uiConfig);
}

export function logout() {
  firebase.auth().signOut().then(function() {
    // Redirect to home
    browserHistory.push('/');
  }, function(error) {
    // Present alert
    alert('Error: ' + error);
  });
}
