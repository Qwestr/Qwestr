import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import ConfirmDialog from './index'

configure({
  adapter: new Adapter(),
})

describe('ConfirmDialog', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<ConfirmDialog></ConfirmDialog>)
  })

  it('should exist!', () => {
    expect(wrapper).toBeTruthy()
  })
})
