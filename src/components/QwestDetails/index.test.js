import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

// import { QwestDetails } from './index'
import QwestDetails from './index'

configure({
  adapter: new Adapter(),
})

describe('QwestDetails', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestDetails></QwestDetails>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
