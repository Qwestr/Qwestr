import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { TaskList, CompletedTaskList } from './index'

// Setup mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(f => f()),
}))

configure({
  adapter: new Adapter(),
})

describe('TaskList', () => {
  describe('TaskList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        // userQwests: jest.fn(() => {
        //   return {
        //     onSnapshot: jest.fn(),
        //   }
        // }),
      }
      wrapper = shallow(
        <TaskList authUser={authUser} firebase={firebase}></TaskList>,
      )
    })

    it('should exist!', () => {
      expect(wrapper).toBeTruthy()
    })
  })

  describe('CompletedTaskList', () => {
    let wrapper, authUser, firebase

    beforeEach(() => {
      authUser = {
        uid: 'user-id',
      }
      firebase = {
        userCompletedQwests: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
        gameCompletedQwests: jest.fn(() => {
          return {
            onSnapshot: jest.fn(),
          }
        }),
      }
    })

    it('should successfully load tasks', () => {
      wrapper = shallow(
        <CompletedTaskList
          authUser={authUser}
          firebase={firebase}
        ></CompletedTaskList>,
      )
      expect(wrapper).toBeTruthy()
      // expect(firebase.userCompletedQwests).toHaveBeenCalled()
    })

    // it('should successfully load game qwests', () => {
    //   const game = {}
    //   wrapper = shallow(
    //     <CompletedQwestList
    //       authUser={authUser}
    //       firebase={firebase}
    //       game={game}
    //     ></CompletedQwestList>,
    //   )
    //   expect(wrapper).toBeTruthy()
    //   expect(firebase.gameCompletedQwests).toHaveBeenCalled()
    // })
  })
})
