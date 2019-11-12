import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { GameDetailsPage } from './index'

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'game-id',
  }),
}))

configure({
  adapter: new Adapter(),
})

describe('GameDetailsPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<GameDetailsPage></GameDetailsPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
