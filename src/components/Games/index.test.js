import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { GameCreate, GameInviteList, GameList, GamesPage } from './index'

// Mock react hooks
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

describe('Games', () => {
  describe('GameCreate', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        FieldValue: {
          serverTimestamp: jest.fn(),
        },
        createGame: jest.fn(),
      }
      wrapper = shallow(
        <GameCreate authUser={authUser} firebase={firebase}></GameCreate>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })

    it('should successfully submit its form', () => {
      // Submit the form
      wrapper
        .find('form')
        .get(0)
        .props.onSubmit(mockEvent)
      // Test expectations
      expect(mockEvent.preventDefault).toHaveBeenCalled()
      expect(firebase.createGame).toHaveBeenCalled()
    })
  })

  describe('GameInviteList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        gameInvitesForUser: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(
        <GameInviteList
          authUser={authUser}
          firebase={firebase}
        ></GameInviteList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('GameList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        userGames: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(
        <GameList authUser={authUser} firebase={firebase}></GameList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('GamesPage', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GamesPage></GamesPage>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
