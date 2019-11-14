import Firebase from './index'

// Setup mocks
jest.mock('firebase/app', () => {
  function MockFirebaseAuth() {
    return jest.fn()
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
})
