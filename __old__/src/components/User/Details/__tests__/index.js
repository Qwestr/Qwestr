import firebase from 'firebase'
import React from 'react'
import { mount } from 'enzyme'
import UserDetails from '../'
import UserManager from '../../../../managers/User'

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
  firebase.__clearMockDatabase()
})

describe('<UserDetails />', () => {
  it('successfully renders the component using a valid User ID', () => {
    // Create new User
    createNewUser()

    // Setup params
    const params = {
      userId: 'testUserId'
    }

    // Mount the component
    const wrapper = mount(<UserDetails params={params}/>)

    // Expect that the correct values exist
    expect(wrapper.find('.user-details-name').text()).toBe('Test User')
    expect(wrapper.find('.user-details-image').exists()).toBeTruthy()
  })

  it('successfully renders the component using an invalid User ID', () => {
    // Mount the component
    const wrapper = mount(<UserDetails />)

    // Expect that the correct values exist
    expect(wrapper.find('.user-not-found').exists()).toBeTruthy()
    expect(wrapper.find('.user-details-name').exists()).toBeFalsy()
    expect(wrapper.find('.user-details-image').exists()).toBeFalsy()
  })
})
