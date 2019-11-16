import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PasswordForgetPage } from './index'

// Setup mocks
const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('PasswordForget', () => {
  let wrapper, firebase

  beforeEach(() => {
    firebase = {
      doPasswordReset: jest.fn(() => {
        return new Promise((resolve, _) => {
          resolve()
        })
      }),
    }
    wrapper = shallow(
      <PasswordForgetPage firebase={firebase}></PasswordForgetPage>,
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
    expect(firebase.doPasswordReset).toHaveBeenCalled()
  })
})
