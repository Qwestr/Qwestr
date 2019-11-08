import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import GamesPage from './index'

configure({
  adapter: new Adapter(),
})

describe('GamesPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<GamesPage></GamesPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
