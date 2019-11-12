import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import {
  GameInviteForm,
  GameInviteList,
  PlayerList,
  GameDetailsPage,
} from './index'

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'game-id',
  }),
}))

configure({
  adapter: new Adapter(),
})

describe('GameDetails', () => {
  describe('GameInviteForm', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GameInviteForm></GameInviteForm>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
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

  describe('PlayerList', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<PlayerList></PlayerList>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('GameDetailsPage', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GameDetailsPage></GameDetailsPage>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
