import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PostsPage } from './index'

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    qwestId: 'qwest-id',
    gameId: 'game-id',
  }),
}))

configure({
  adapter: new Adapter(),
})

describe('Posts', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PostsPage></PostsPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
