import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { HomePage } from './index'

configure({
  adapter: new Adapter(),
})

describe('Home', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<HomePage></HomePage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
