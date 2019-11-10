import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import QwestCreate from './index'

configure({
  adapter: new Adapter(),
})

describe('QwestCreate', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestCreate></QwestCreate>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
