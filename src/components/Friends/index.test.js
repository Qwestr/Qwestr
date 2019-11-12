import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import {
  FriendInviteForm,
  ReceivedInviteList,
  SentInviteList,
  FriendList,
  FriendsPage,
} from './index'

configure({
  adapter: new Adapter(),
})

describe('Friends', () => {
  describe('FriendInviteForm', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<FriendInviteForm></FriendInviteForm>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('ReceivedInviteList', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<ReceivedInviteList></ReceivedInviteList>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('SentInviteList', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<SentInviteList></SentInviteList>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('FriendList', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<FriendList></FriendList>)
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
