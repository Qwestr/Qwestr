import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { SignInPage } from './index'

// Setup mocks
const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('SignIn', () => {
  let wrapper, firebase

  beforeEach(() => {
    firebase = {
      doSignInWithEmailAndPassword: jest.fn(() => {
        return new Promise((resolve, _) => {
          resolve()
        })
      }),
    }
    wrapper = shallow(<SignInPage firebase={firebase}></SignInPage>)
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
    expect(firebase.doSignInWithEmailAndPassword).toHaveBeenCalled()
  })
})
