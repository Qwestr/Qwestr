import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

// import { GameDetailsPage } from './index'
import GameDetailsPage from './index'

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
