import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import QwestEdit from './index'

// Setup mocks
const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('QwestEdit', () => {
  let wrapper, firebase, qwest, close

  beforeEach(() => {
    firebase = {
      FieldValue: {
        serverTimestamp: jest.fn(),
      },
      updateQwest: jest.fn(),
    }
    qwest = {
      data: jest.fn(() => {
        return {}
      }),
    }
    close = jest.fn()
    wrapper = shallow(
      <QwestEdit firebase={firebase} qwest={qwest} close={close}></QwestEdit>,
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
    expect(firebase.updateQwest).toHaveBeenCalled()
  })
})
