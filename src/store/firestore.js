import firebase from 'firebase/app'
import 'firebase/firestore'

import config from '../config/firebase'

// Initialize the app
firebase.initializeApp(config)

// Create firestore instance
const firestore = firebase.firestore()

export default firestore
