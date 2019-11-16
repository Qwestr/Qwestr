import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { SignOutButton } from './index'

configure({
  adapter: new Adapter(),
})

describe('SignOut', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SignOutButton></SignOutButton>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
