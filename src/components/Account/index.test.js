import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import {
  DefaultLoginToggle,
  SocialLoginToggle,
  LoginManagementBase,
  AccountPage,
} from './index'

configure({
  adapter: new Adapter(),
})

describe('Account', () => {
  describe('DefaultLoginToggle', () => {
    let wrapper, signInMethod

    beforeEach(() => {
      signInMethod = {}
      wrapper = shallow(
        <DefaultLoginToggle signInMethod={signInMethod}></DefaultLoginToggle>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('SocialLoginToggle', () => {
    let wrapper, signInMethod

    beforeEach(() => {
      signInMethod = {}
      wrapper = shallow(
        <SocialLoginToggle signInMethod={signInMethod}></SocialLoginToggle>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('LoginManagementBase', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        email: 'user@mail.com',
      }
      firebase = {
        auth: {
          fetchSignInMethodsForEmail: jest.fn(() => {
            return new Promise((resolve, _) => {
              resolve()
            })
          }),
        },
      }
      wrapper = shallow(
        <LoginManagementBase
          authUser={authUser}
          firebase={firebase}
        ></LoginManagementBase>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('AccountPage', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<AccountPage></AccountPage>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
