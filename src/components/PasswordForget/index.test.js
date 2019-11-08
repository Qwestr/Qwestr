import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import PasswordForgotPage from './index'

configure({
  adapter: new Adapter(),
})

describe('PasswordForgotPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PasswordForgotPage></PasswordForgotPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
