import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import Admin from './index'

configure({
  adapter: new Adapter(),
})

describe('Admin', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Admin></Admin>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
