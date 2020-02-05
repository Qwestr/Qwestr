import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import TaskCreate from './index'

// Setup mocks
const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('TaskCreate', () => {
  let wrapper, authUser, firebase

  beforeEach(() => {
    authUser = {
      uid: 'user-id',
    }
    firebase = {
      FieldValue: {
        serverTimestamp: jest.fn(),
      },
      createTask: jest.fn(),
    }
    wrapper = shallow(
      <TaskCreate authUser={authUser} firebase={firebase}></TaskCreate>,
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
    expect(firebase.createTask).toHaveBeenCalled()
  })
})
