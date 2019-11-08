import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import Navigation from './index'

configure({
  adapter: new Adapter(),
})

describe('Navigation', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Navigation></Navigation>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
