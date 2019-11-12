import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PasswordChangeForm } from './index'

// Setup mocks
const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('PasswordChange', () => {
  let wrapper, firebase

  beforeEach(() => {
    firebase = {
      doPasswordUpdate: jest.fn(() => {
        return new Promise((resolve, _) => {
          resolve()
        })
      }),
    }
    wrapper = shallow(
      <PasswordChangeForm firebase={firebase}></PasswordChangeForm>,
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
    expect(firebase.doPasswordUpdate).toHaveBeenCalled()
  })
})
