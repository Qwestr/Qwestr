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

  user = id => this.users().doc(id)

  userFriends = id => this.user(id).collection('friends')

  findUserForEmail = email => this.users().where('email', '==', email)

  findUserFriendForEmail = (email, id) =>
    this.userFriends(id).where('email', '==', email)

  userGames = id => this.user(id).collection('games')

  // *** Qwest API ***
  qwests = () => this.store.collection('qwests')

  qwest = id => this.qwests().doc(id)

  gameQwests = id =>
    this.qwests()
      .where('gameId', '==', id)
      .where('isCompleted', '==', false)

  gameCompletedQwests = id =>
    this.qwests()
      .where('gameId', '==', id)
      .where('isCompleted', '==', true)

  userQwests = id =>
    this.qwests()
      .where('userId', '==', id)
      .where('isCompleted', '==', false)

  userCompletedQwests = id =>
    this.qwests()
      .where('userId', '==', id)
      .where('isCompleted', '==', true)

  createQwest = qwest => {
    this.qwests().add(qwest)
  }

  completeQwest = id => {
    // Complete qwest
    this.qwest(id).update({
      isCompleted: true,
    })
  }

  resetQwest = id => {
    // Complete qwest
    this.qwest(id).update({
      isCompleted: false,
    })
  }

  deleteQwest = id => {
    // Delete qwest
    this.qwest(id).delete()
  }

  // *** Game API ***
  games = () => this.store.collection('games')

  game = id => this.games().doc(id)

  gamePlayers = id => this.game(id).collection('players')

  acceptGameInvite = invite => {
    // Update games document's players collection with requested user data
    this.gamePlayers(invite.data().gameId)
      .doc(invite.data().requestedId)
      .set({
        username: invite.data().requestedUsername,
        email: invite.data().requestedEmail,
      })
    // Update user document's games collection with game data
    this.userGames(invite.data().requestedId)
      .doc(invite.data().gameId)
      .set({
        name: invite.data().gameName,
      })
  }

  createGame = async (game, authUser) => {
    // Create the new game
    const newGame = await this.games().add(game)
    // Create players collection for game
    newGame
      .collection('players')
      .doc(authUser.uid)
      .set({
        username: authUser.username,
        email: authUser.email,
      })
    // Add game to user's games collection
    this.userGames(authUser.uid)
      .doc(newGame.id)
      .set({
        name: game.name,
      })
  }

  deleteGame = async id => {
    // Get game's players collections
    const players = await this.gamePlayers(id).get()
    // Iterate through each player
    players.docs.forEach(player => {
      // Remove game from player's games collection
      this.userGames(player.id)
        .doc(id)
        .delete()
    })
    // Delete game
    this.game(id).delete()
  }

  // *** Invite API ***
  invites = () => this.store.collection('invites')

  invite = id => this.invites().doc(id)

  findSentInvitesForUser = (userId, authUserId) =>
    this.invites()
      .where('requestedId', '==', userId)
      .where('requesterId', '==', authUserId)
      .where('gameId', '==', null)

  findReceivedInvitesForUser = (userId, authUserId) =>
    this.invites()
      .where('requesterId', '==', userId)
      .where('requestedId', '==', authUserId)
      .where('gameId', '==', null)

  findSentGameInvitesForUser = (userId, gameId) =>
    this.invites()
      .where('requestedId', '==', userId)
      .where('gameId', '==', gameId)

  sentUserInvites = id =>
    this.invites()
      .where('requesterId', '==', id)
      .where('gameId', '==', null)

  receivedUserInvites = id =>
    this.invites()
      .where('requestedId', '==', id)
      .where('gameId', '==', null)

  gameInvitesForUser = id =>
    this.invites()
      .where('requestedId', '==', id)
      .where('gameId', '>=', '')

  acceptFriendInvite = invite => {
    // Update friends document of requested user with requester user data
    this.userFriends(invite.data().requestedId)
      .doc(invite.data().requesterId)
      .set({
        username: invite.data().requesterUsername,
        email: invite.data().requesterEmail,
      })
    // Update friends document of requester user with requested user data
    this.userFriends(invite.data().requesterId)
      .doc(invite.data().requestedId)
      .set({
        username: invite.data().requestedUsername,
        email: invite.data().requestedEmail,
      })
  }

  sentGameInvites = id => this.invites().where('gameId', '==', id)

  // *** Post API ***
  qwestPosts = id => this.qwest(id).collection('posts')

  gamePosts = id => this.game(id).collection('posts')

  mostRecentQwestPosts = id => this.qwestPosts(id).orderBy('createdAt', 'desc')

  mostRecentGamePosts = id => this.gamePosts(id).orderBy('createdAt', 'desc')
}

export default Firebase
