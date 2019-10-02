import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import App from './App'

configure({
  adapter: new Adapter(),
})

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App></App>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
