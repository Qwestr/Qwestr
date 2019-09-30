import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import QwestList from './QwestList'

configure({
  adapter: new Adapter()
})

describe('QwestList', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestList></QwestList>)
  })

  it('should contain a list of qwests', () => {
    expect(wrapper.find('ul')).toHaveLength(1)
  })
})
