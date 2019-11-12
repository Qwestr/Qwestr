import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PostCreate, PostList, PostsPage } from './index'

// Setup mocks
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
  describe('PostCreate', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<PostCreate></PostCreate>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('PostList', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<PostList></PostList>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('PostsPage', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<PostsPage></PostsPage>)
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })
})
