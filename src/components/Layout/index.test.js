import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import Layout from './index'

configure({
  adapter: new Adapter(),
})

describe('Layout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Layout></Layout>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
