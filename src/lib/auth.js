import firebase from 'firebase';
import Enum from 'es6-enum';

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
    console.log('login success!');
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
  }).catch(function(error) {
    console.log('login fail!');
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
  });
}

export function logout() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
}
