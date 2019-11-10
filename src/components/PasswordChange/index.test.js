import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PasswordChangeForm } from './index'

configure({
  adapter: new Adapter(),
})

describe('PasswordChangeForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PasswordChangeForm></PasswordChangeForm>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
