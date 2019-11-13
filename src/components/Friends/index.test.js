import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import TextField from '@material-ui/core/TextField'

import {
  FriendInviteForm,
  ReceivedInviteList,
  SentInviteList,
  FriendList,
  FriendsPage,
} from './index'

// Setup mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(f => f()),
}))

const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('Friends', () => {
  describe('FriendInviteForm', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
        email: 'user@mail.com',
      }
      firebase = {
        FieldValue: {
          serverTimestamp: jest.fn(),
        },
        findUserForEmail: jest.fn(() => {
          return {
            get: jest.fn(() => {
              return {
                empty: false,
                docs: [
                  {
                    data: jest.fn(() => {
                      return {}
                    }),
                  },
                ],
              }
            }),
          }
        }),
        findUserFriendForEmail: jest.fn(() => {
          return {
            get: jest.fn(() => {
              return {
                empty: true,
              }
            }),
          }
        }),
        findSentInvitesForUser: jest.fn(() => {
          return {
            get: jest.fn(() => {
              return {
                empty: true,
              }
            }),
          }
        }),
        findReceivedInvitesForUser: jest.fn(() => {
          return {
            get: jest.fn(() => {
              return {
                empty: true,
              }
            }),
          }
        }),
        createInvite: jest.fn(),
      }
      wrapper = shallow(
        <FriendInviteForm
          authUser={authUser}
          firebase={firebase}
        ></FriendInviteForm>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })

    it('should successfully submit its form', async () => {
      // Submit the form
      await wrapper
        .find('form')
        .get(0)
        .props.onSubmit(mockEvent)
      // Test expectations
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(firebase.findUserForEmail).toHaveBeenCalled()
      expect(firebase.findUserFriendForEmail).toHaveBeenCalled()
      expect(firebase.findSentInvitesForUser).toHaveBeenCalled()
      expect(firebase.findReceivedInvitesForUser).toHaveBeenCalled()
      expect(firebase.createInvite).toHaveBeenCalled()
    })
  })

  describe('ReceivedInviteList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        receivedUserInvites: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(
        <ReceivedInviteList
          authUser={authUser}
          firebase={firebase}
        ></ReceivedInviteList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('SentInviteList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        sentUserInvites: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(
        <SentInviteList
          authUser={authUser}
          firebase={firebase}
        ></SentInviteList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('FriendList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        userFriends: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(
        <FriendList authUser={authUser} firebase={firebase}></FriendList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('FriendsPage', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<FriendsPage></FriendsPage>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
