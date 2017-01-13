import firebase from 'firebase';
import Enum from 'es6-enum';
import { browserHistory } from 'react-router';

export const AUTH_PROVIDER = Enum(
  "FACEBOOK",
  "GOOGLE"
);

function getFirebaseAuthProvider(authProvider) {
  switch (authProvider) {
    case AUTH_PROVIDER.FACEBOOK:
      return new firebase.auth.FacebookAuthProvider();
    case AUTH_PROVIDER.GOOGLE:
        return new firebase.auth.GoogleAuthProvider();
    default:
        return null;
  }
}

export function login(authProvider) {
  // Setup Firebase Auth Provider
  const provider = getFirebaseAuthProvider(authProvider);

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // Redirect to home
    browserHistory.push('/');
  }).catch(function(error) {
    // Present alert for error
    alert('Error: ' + error.code);
  });
}

export function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
}
