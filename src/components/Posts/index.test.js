import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PostCreate, PostList, PostsPage } from './index'

// Setup mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(f => f()),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    qwestId: 'qwest-id',
    gameId: 'game-id',
  }),
}))

const mockEvent = {
  preventDefault: jest.fn(),
}

configure({
  adapter: new Adapter(),
})

describe('Posts', () => {
  describe('PostCreate', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        username: 'Test User',
      }
      firebase = {
        FieldValue: {
          serverTimestamp: jest.fn(),
        },
        createGamePost: jest.fn(),
        createQwestPost: jest.fn(),
      }
      wrapper = shallow(
        <PostCreate authUser={authUser} firebase={firebase}></PostCreate>,
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
      expect(firebase.createQwestPost).toHaveBeenCalled()
    })
  })

  describe('PostList', () => {
    let wrapper, firebase

    beforeEach(() => {
      firebase = {
        mostRecentQwestPosts: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
      wrapper = shallow(<PostList firebase={firebase}></PostList>)
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
