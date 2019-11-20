import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import GameEdit from './index'

// Setup mocks
const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('GameEdit', () => {
  let wrapper, firebase, game, close

  beforeEach(() => {
    firebase = {
      FieldValue: {
        serverTimestamp: jest.fn(),
      },
      updateGame: jest.fn(),
    }
    game = {
      data: jest.fn(() => {
        return {}
      }),
    }
    close = jest.fn()
    wrapper = shallow(
      <GameEdit firebase={firebase} game={game} close={close}></GameEdit>,
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
    expect(firebase.updateGame).toHaveBeenCalled()
    expect(close).toHaveBeenCalled()
  })
})
