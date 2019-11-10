import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { LandingPage } from './index'

configure({
  adapter: new Adapter(),
})

describe('LandingPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<LandingPage></LandingPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
