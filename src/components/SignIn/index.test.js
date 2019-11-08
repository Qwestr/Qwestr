import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import SignInPage from './index'

configure({
  adapter: new Adapter(),
})

describe('SignInPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SignInPage></SignInPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
