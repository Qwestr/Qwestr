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
    // Get FieldValue
    this.FieldValue = app.firestore.FieldValue
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

  userFriends = id =>
    this.store
      .collection('users')
      .doc(id)
      .collection('friends')

  findUserForEmail = email =>
    this.store.collection('users').where('email', '==', email)

  findUserFriendForEmail = (email, authUser) =>
    this.store
      .collection('users')
      .doc(authUser.uid)
      .collection('friends')
      .where('email', '==', email)

  userGames = id =>
    this.store
      .collection('users')
      .doc(id)
      .collection('games')

  // *** Qwest API ***
  qwests = () => this.store.collection('qwests')

  gameQwests = game =>
    this.store.collection('qwests').where('gameId', '==', game.id)

  userQwests = authUser =>
    this.store.collection('qwests').where('userId', '==', authUser.uid)

  qwest = id => this.store.collection('qwests').doc(id)

  // *** Game API ***
  games = () => this.store.collection('games')

  game = id => this.store.collection('games').doc(id)

  createdGames = authUser =>
    this.store.collection('games').where('userId', '==', authUser.uid)

  acceptGameInvite = invite => {
    // Update games document's players collection with requested user data
    this.store
      .collection('games')
      .doc(invite.data().gameId)
      .collection('players')
      .doc(invite.data().requestedId)
      .set({
        username: invite.data().requestedUsername,
        email: invite.data().requestedEmail,
        createdAt: this.FieldValue.serverTimestamp(),
      })
    // Update user document's games collection with game data
    this.store
      .collection('users')
      .doc(invite.data().requestedId)
      .collection('games')
      .doc(invite.data().gameId)
      .set({
        name: invite.data().gameName,
        createdAt: this.FieldValue.serverTimestamp(),
      })
  }

  // *** Invite API ***
  invites = () => this.store.collection('invites')

  invite = id => this.store.collection('invites').doc(id)

  findSentInvitesForUser = (user, authUser) =>
    this.store
      .collection('invites')
      .where('requestedId', '==', user.id)
      .where('requesterId', '==', authUser.uid)
      .where('gameId', '==', null)

  findReceivedInvitesForUser = (user, authUser) =>
    this.store
      .collection('invites')
      .where('requesterId', '==', user.id)
      .where('requestedId', '==', authUser.uid)
      .where('gameId', '==', null)

  findSentGameInvitesForUser = (user, game) =>
    this.store
      .collection('invites')
      .where('requestedId', '==', user.id)
      .where('gameId', '==', game.id)

  sentUserInvites = authUser =>
    this.store
      .collection('invites')
      .where('requesterId', '==', authUser.uid)
      .where('gameId', '==', null)

  receivedUserInvites = authUser =>
    this.store
      .collection('invites')
      .where('requestedId', '==', authUser.uid)
      .where('gameId', '==', null)

  gameInvitesForUser = authUser =>
    this.store
      .collection('invites')
      .where('requestedId', '==', authUser.uid)
      .where('gameId', '>=', '')

  acceptFriendInvite = invite => {
    // Update friends document of requested user with requester user data
    this.store
      .collection('users')
      .doc(invite.data().requestedId)
      .collection('friends')
      .doc(invite.data().requesterId)
      .set({
        username: invite.data().requesterUsername,
        email: invite.data().requesterEmail,
        createdAt: this.FieldValue.serverTimestamp(),
      })
    // Update friends document of requester user with requested user data
    this.store
      .collection('users')
      .doc(invite.data().requesterId)
      .collection('friends')
      .doc(invite.data().requestedId)
      .set({
        username: invite.data().requestedUsername,
        email: invite.data().requestedEmail,
        createdAt: this.FieldValue.serverTimestamp(),
      })
  }

  sentGameInvites = id =>
    this.store.collection('invites').where('gameId', '==', id)
}

export default Firebase
