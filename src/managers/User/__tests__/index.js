import firebase from 'firebase'
// import User from '../../../models/User'
import UserManager from '../'

afterEach(() => {
  firebase.__resetAuthUserId()
  firebase.__clearMockDatabase()
})

it('successfully creates a User', () => {
  // Create User data object
  const userData = {
    uid: 'testUserId',
    displayName: 'Test User',
    photoURL: 'http://profileImage.png',
    providerData: [
      {
        uid: 'testUserFacebookId',
        providerId: 'facebook.com'
      }
    ]
  }

  // Create credentials data
  const credentialsData = {
    accessToken: 'testAccessToken',
    provider: 'facebook.com'
  }

  // Create a UserManager object
  const userManager = new UserManager()

  userManager.createUser(userData, credentialsData, () => {})

  // Get resulting database
  const database = firebase.__getMockDatabase()

  // Expect that the correct User data has been created/ updated
  expect(database['users']['general']['testUserId']['credentials']['Google']).toBeFalsy()
  expect(database['users']['general']['testUserId']['credentials']['Facebook'].id).toBe('testUserFacebookId')
  expect(database['users']['general']['testUserId']['credentials']['Facebook'].accessToken).toBe('testAccessToken')

  // Expect that the correct Social User data has been created/ updated
  expect(database['users']['social']['Google']).toBeFalsy()
  expect(database['users']['social']['Facebook']['testUserFacebookId'].uid).toBe('testUserId')
})
