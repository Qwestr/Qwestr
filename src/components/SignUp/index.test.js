import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { SignUpPage } from './index'

configure({
  adapter: new Adapter(),
})

describe('SignUpPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SignUpPage></SignUpPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
