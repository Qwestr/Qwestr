import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { UserList, AdminPage } from './index'

configure({
  adapter: new Adapter(),
})

describe('Admin', () => {
  describe('UserList', () => {
    let wrapper, users

    beforeEach(() => {
      users = []
      wrapper = shallow(<UserList users={users}></UserList>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('AdminPage', () => {
    let wrapper, firebase

    beforeEach(() => {
      firebase = {
        users: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(<AdminPage firebase={firebase}></AdminPage>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
