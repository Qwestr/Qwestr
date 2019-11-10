import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

// import { SignOutPage } from './index'
import SignOutPage from './index'

configure({
  adapter: new Adapter(),
})

describe('SignOutPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SignOutPage></SignOutPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
