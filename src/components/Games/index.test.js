import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { GameCreate, GameInviteList, GameList, GamesPage } from './index'

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
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GameInviteList></GameInviteList>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('GameList', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GameList></GameList>)
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
