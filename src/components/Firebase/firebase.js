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
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

class Firebase {
  constructor() {
    // Initialize the app
    app.initializeApp(config)
    // Get email auth provider
    this.emailAuthProvider = app.auth.EmailAuthProvider
    // Get server values
    this.serverValues = app.firestore.FieldValue
    // Initialize auth
    this.auth = app.auth()
    // Initialize firestore
    this.store = app.firestore()
    // Initialize social login providers
    this.googleProvider = new app.auth.GoogleAuthProvider()
    this.facebookProvider = new app.auth.FacebookAuthProvider()
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider)

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    })

  // *** Auth State API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            // Get user document from snapshot data
            const user = snapshot.data()
            // Default empty roles
            if (!user.roles) {
              user.roles = {}
            }
            // Merge auth and user document
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...user,
            }
            next(authUser)
          })
      } else {
        fallback()
      }
    })

  // *** User API ***
  users = () => this.store.collection('users')

  user = id => this.store.collection('users').doc(id)

  findUserByEmail = email =>
    this.store.collection('users').where('email', '==', email)

  // *** Qwest API ***
  qwests = () => this.store.collection('qwests')

  gameQwests = game =>
    this.store.collection('qwests').where('gameId', '==', game.id)

  userQwests = authUser =>
    this.store.collection('qwests').where('userId', '==', authUser.uid)

  qwest = id => this.store.collection('qwests').doc(id)

  // *** Game API ***
  games = () => this.store.collection('games')

  userGames = authUser =>
    this.store.collection('games').where('userId', '==', authUser.uid)

  game = id => this.store.collection('games').doc(id)

  // *** Invite API ***
  invites = () => this.store.collection('invites')
}

export default Firebase
