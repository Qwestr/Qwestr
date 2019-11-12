import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { GameCreate, GameInviteList, GameList, GamesPage } from './index'

configure({
  adapter: new Adapter(),
})

describe('Games', () => {
  describe('GameCreate', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<GameCreate></GameCreate>)
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
