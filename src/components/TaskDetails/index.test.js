import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { TaskDetailsPage } from './index'

// Setup mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(f => f()),
}))

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

describe('TaskDetailsPage', () => {
  let wrapper, firebase

  beforeEach(() => {
    firebase = {
      qwest: jest.fn(() => {
        return {
          onSnapshot: jest.fn(),
        }
      }),
    }
    wrapper = shallow(<TaskDetailsPage firebase={firebase}></TaskDetailsPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
