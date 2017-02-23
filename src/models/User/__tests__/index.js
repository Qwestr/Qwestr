import User from '../'

it('successfully updates a User', () => {
  // Create User object
  const user = new User({
    displayName: 'User Display Name',
    photoURL: 'http://profileImage.png'
  })

  // Create updateData object
  const updateData = {
    displayName: 'Changed Display Name'
  }

  // Update the User
  user.update(updateData)

  // Expect that the User object has been updated correctly
  expect(user.displayName).toBe('Changed Display Name')
  expect(user.photoURL).toBe('http://profileImage.png')
})

it('successfully updates the Facebook credentials of a User', () => {
  // Create User object
  const user = new User({
    displayName: 'Test User',
    photoURL: 'http://profileImage.png'
  })

  // Create providerData and credentials objects
  const providerData = [
    {
      uid: 'testUserFacebookId',
      providerId: 'facebook.com'
    },
    {
      uid: 'testUserGoogleId',
      providerId: 'google.com'
    }
  ]

  const credentials = {
    accessToken: 'testAccessToken',
    provider: 'facebook.com'
  }

  // Update the User credentials
  user.updateCredentials(providerData, credentials)

  // Expect that the User object has been updated correctly
  expect(user.credentials.Facebook).toBeTruthy()
  expect(user.credentials.Google).toBeFalsy()
  expect(user.credentials.Facebook.id).toBe('testUserFacebookId')
  expect(user.credentials.Facebook.accessToken).toBe('testAccessToken')
})

it('successfully updates the Google credentials of a User', () => {
  // Create User object
  const user = new User({
    displayName: 'Test User',
    photoURL: 'http://profileImage.png'
  })

  // Create providerData and credentials objects
  const providerData = [
    {
      uid: 'testUserFacebookId',
      providerId: 'facebook.com'
    },
    {
      uid: 'testUserGoogleId',
      providerId: 'google.com'
    }
  ]

  const credentials = {
    accessToken: 'testAccessToken',
    provider: 'google.com'
  }

  // Update the User credentials
  user.updateCredentials(providerData, credentials)

  // Expect that the User object has been updated correctly
  expect(user.credentials.Google).toBeTruthy()
  expect(user.credentials.Facebook).toBeFalsy()
  expect(user.credentials.Google.id).toBe('testUserGoogleId')
  expect(user.credentials.Google.accessToken).toBe('testAccessToken')
})
