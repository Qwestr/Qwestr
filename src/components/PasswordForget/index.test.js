import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PasswordForgetPage } from './index'

configure({
  adapter: new Adapter(),
})

describe('PasswordForget', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PasswordForgetPage></PasswordForgetPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
