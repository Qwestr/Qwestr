import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import Account from './index'

configure({
  adapter: new Adapter(),
})

describe('Account', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Account></Account>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
