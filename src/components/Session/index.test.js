import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import {
  AuthUserContext,
  withAuthentication,
  withAuthorization,
  withEmailVerification,
  withUnauthorization,
} from './index'

// Setup mocks
jest.mock('../Firebase', () => ({
  ...jest.requireActual('../Firebase'),
  withFirebase: jest.fn(Component => props => {
    const firebase = {
      onAuthUserListener: jest.fn(),
    }
    return <Component {...props} firebase={firebase}></Component>
  }),
}))

const MockComponent = () => <div></div>

configure({
  adapter: new Adapter(),
})

describe('Session', () => {
  describe('AuthUserContext', () => {
    it('should exist!', () => {
      expect(AuthUserContext).toBeTruthy()
    })
  })

  describe('withAuthentication', () => {
    let wrapper

    beforeEach(() => {
      const Component = withAuthentication(MockComponent)
      wrapper = mount(<Component></Component>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('withAuthorization', () => {
    it('should exist!', () => {
      expect(withAuthorization).toBeTruthy()
    })
  })

  describe('withEmailVerification', () => {
    it('should exist!', () => {
      expect(withEmailVerification).toBeTruthy()
    })
  })

  describe('withUnauthorization', () => {
    it('should exist!', () => {
      expect(withUnauthorization).toBeTruthy()
    })
  })
})
