import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import TextField from '@material-ui/core/TextField'

import {
  GameInviteForm,
  GameInviteList,
  PlayerList,
  GameDetailsPage,
} from './index'

// Setup mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(f => f()),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'game-id',
  }),
}))

const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('GameDetails', () => {
  describe('GameInviteForm', () => {
    let wrapper, authUser, firebase, game

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        FieldValue: {
          serverTimestamp: jest.fn(),
        },
        findSentGameInvitesForUser: jest.fn(() => {
          return {
            get: jest.fn(() => {
              return {
                empty: true,
              }
            }),
          }
        }),
        userFriends: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
        createInvite: jest.fn(),
      }
      game = {
        id: 'game-id',
        data: jest.fn(() => {
          return {
            name: 'game-name',
          }
        }),
      }
      wrapper = shallow(
        <GameInviteForm
          authUser={authUser}
          firebase={firebase}
          game={game}
        ></GameInviteForm>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })

    it('should successfully submit its form', async () => {
      // Set form data
      wrapper
        .find(TextField)
        .find("[id='friend']")
        .get(0)
        .props.onChange({
          target: {
            value: {
              id: 'friend-id',
              data: jest.fn(() => {
                return {
                  username: 'friend-username',
                  email: 'friend@mail.com',
                }
              }),
            },
          },
        })
      // Submit the form
      await wrapper
        .find('form')
        .get(0)
        .props.onSubmit(mockEvent)
      // Test expectations
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(firebase.findSentGameInvitesForUser).toHaveBeenCalled()
      expect(firebase.createInvite).toHaveBeenCalled()
    })
  })

  describe('GameInviteList', () => {
    let wrapper, firebase, game

    beforeEach(() => {
      firebase = {
        sentGameInvites: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      game = {
        id: 'game-id',
      }
      wrapper = shallow(
        <GameInviteList firebase={firebase} game={game}></GameInviteList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('PlayerList', () => {
    let wrapper, firebase, game

    beforeEach(() => {
      firebase = {
        gamePlayers: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      game = {
        id: 'game-id',
      }
      wrapper = shallow(
        <PlayerList firebase={firebase} game={game}></PlayerList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('GameDetailsPage', () => {
    let wrapper, firebase, game

    beforeEach(() => {
      firebase = {
        game: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      game = {
        id: 'game-id',
      }
      wrapper = shallow(
        <GameDetailsPage firebase={firebase} game={game}></GameDetailsPage>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
