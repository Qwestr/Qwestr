import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import config from '../config/firebase'

// Initialize the app
firebase.initializeApp(config)

// Create auth instance
export const auth = firebase.auth()

// Create firestore instance
const firestore = firebase.firestore()

export default firestore
