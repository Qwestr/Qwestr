import Firebase from './index'

// Setup mocks
jest.mock('firebase/app', () => {
  const MockFirebaseAuth = () => {
    return {
      createUserWithEmailAndPassword: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      signInWithPopup: jest.fn(),
      signOut: jest.fn(),
      sendPasswordResetEmail: jest.fn(),
      currentUser: {
        updatePassword: jest.fn(),
      },
    }
  }
  MockFirebaseAuth.GoogleAuthProvider = jest.fn()
  MockFirebaseAuth.FacebookAuthProvider = jest.fn()

  return {
    initializeApp: jest.fn(),
    auth: MockFirebaseAuth,
    firestore: jest.fn(),
  }
})

describe('Firebase', () => {
  let firebase

  beforeEach(() => {
    firebase = new Firebase()
  })

  it('should exist!', () => {
    expect(firebase).toBeTruthy()
  })

  it('should successfully call doCreateUserWithEmailAndPassword()', () => {
    firebase.doCreateUserWithEmailAndPassword()
    expect(firebase.auth.createUserWithEmailAndPassword).toHaveBeenCalled()
  })

  it('should successfully call doSignInWithEmailAndPassword()', () => {
    firebase.doSignInWithEmailAndPassword()
    expect(firebase.auth.signInWithEmailAndPassword).toHaveBeenCalled()
  })

  it('should successfully call doSignInWithGoogle()', () => {
    firebase.doSignInWithGoogle()
    expect(firebase.auth.signInWithPopup).toHaveBeenCalled()
  })

  it('should successfully call doSignInWithFacebook()', () => {
    firebase.doSignInWithFacebook()
    expect(firebase.auth.signInWithPopup).toHaveBeenCalled()
  })

  it('should successfully call doSignOut()', () => {
    firebase.doSignOut()
    expect(firebase.auth.signOut).toHaveBeenCalled()
  })

  it('should successfully call doPasswordReset()', () => {
    firebase.doPasswordReset()
    expect(firebase.auth.sendPasswordResetEmail).toHaveBeenCalled()
  })

  it('should successfully call doPasswordUpdate()', () => {
    firebase.doPasswordUpdate()
    expect(firebase.auth.currentUser.updatePassword).toHaveBeenCalled()
  })
})
