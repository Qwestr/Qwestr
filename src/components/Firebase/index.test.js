import Firebase from './index'

// Setup mocks

function MockAuthentication() {}

function MockGoogleAuthProvider() {}

function MockFacebookAuthProvider() {}

function MockFirebaseAuth() {
  return new MockAuthentication()
}
MockFirebaseAuth.GoogleAuthProvider = MockGoogleAuthProvider
MockFirebaseAuth.FacebookAuthProvider = MockFacebookAuthProvider

jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(),
    auth: MockFirebaseAuth,
    // auth: jest.fn(() => {
    //   return {
    //     GoogleAuthProvider: jest.fn().mockImplementation(() => {
    //       return {}
    //     }),
    //   }
    // }),
    // auth: jest.fn(),
    // GoogleAuthProvider: jest.fn().mockImplementation(() => {
    //   return {}
    // }),
    // auth: {
    //   GoogleAuthProvider: jest.fn().mockImplementation(() => {
    //     return {}
    //   }),
    //   FacebookAuthProvider: jest.fn().mockImplementation(() => {
    //     return {}
    //   }),
    // },
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
