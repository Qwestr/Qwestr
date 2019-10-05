import firebase from 'firebase'

import config from '../config/firebase'

// Initialize the app
firebase.initializeApp(config)

// Create firestore instance
const firestore = firebase.firestore()

export default firestore
