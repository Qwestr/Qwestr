import firebase from 'firebase'

// Set config parameters
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
}
// Initialize the app
firebase.initializeApp(config)

export default firebase
