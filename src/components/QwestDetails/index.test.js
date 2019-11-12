import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { QwestDetailsPage } from './index'

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'qwest-id',
    gameId: 'game-id',
  }),
}))

configure({
  adapter: new Adapter(),
})

describe('QwestDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestDetailsPage></QwestDetailsPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
