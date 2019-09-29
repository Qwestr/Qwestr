import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import App from './App'

configure({
  adapter: new Adapter()
})

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App></App>)
  })

  it('should have a form to create a new qwest', () => {
    expect(wrapper.find('form')).toHaveLength(1)
  })
})
