import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import FriendsPage from './index'

configure({
  adapter: new Adapter(),
})

describe('FriendsPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<FriendsPage></FriendsPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
