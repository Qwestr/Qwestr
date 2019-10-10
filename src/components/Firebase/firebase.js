import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_FIREBASE_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
}

class Firebase {
  constructor() {
    // Initialize the app
    app.initializeApp(config)
    // Initialize auth
    this.auth = app.auth()
    // Initialize firestore
    this.store = app.firestore()
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  // *** Auth State API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            // Get user document from snapshot data
            const user = snapshot.data()
            // default empty roles
            if (!user.roles) {
              user.roles = {}
            }
            // Merge auth and user document
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...user,
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***
  user = id => this.store.collection('users').doc(id)

  users = () => this.store.collection('users')
}

export default Firebase
