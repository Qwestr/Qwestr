import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import QwestsPage from './index'

configure({
  adapter: new Adapter(),
})

describe('QwestsPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestsPage></QwestsPage>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
