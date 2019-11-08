import firebase from 'firebase'
import UserManager from '../'

function createNewUser() {
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

  // Create the User
  userManager.createUser(userData, credentialsData, () => {})
}

afterEach(() => {
  firebase.__resetAuthUserId()
  firebase.__clearMockDatabase()
})

it('successfully creates a User', () => {
  // Create new User
  createNewUser()

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

it('successfully gets a User', () => {
  // Create new User
  createNewUser()

  // Create User data object
  const userData = {
    uid: 'testUserId'
  }

  // Create a UserManager object
  const userManager = new UserManager()

  // Get the User
  let returnedUserData = null
  userManager.getUser(userData, (data) => {
    returnedUserData = data.val()
  })

  // Expect that valid User data has been returned
  expect(returnedUserData).toBeTruthy()
})

it('successfully gets a Social User', () => {
  // Create new User
  createNewUser()

  // Create User data object
  const userData = {
    id: 'testUserFacebookId'
  }

  // Create a UserManager object
  const userManager = new UserManager()

  // Get the User
  let returnedUserData = null
  userManager.getSocialUser(userData, (data) => {
    returnedUserData = data.val()
  })

  // Expect that valid User data has been returned
  expect(returnedUserData).toBeTruthy()
})
