import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { QwestList } from './index'

configure({
  adapter: new Adapter(),
})

describe('QwestList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestList></QwestList>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
