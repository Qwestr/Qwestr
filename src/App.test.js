import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import QwestForm from './components/QwestForm/QwestForm'
import QwestList from './components/QwestList/QwestList'
import App from './App'

configure({
  adapter: new Adapter()
})

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App></App>)
  })

  it('should contain a QwestForm component', () => {
    expect(wrapper.find(QwestForm)).toHaveLength(1)
  })

  it('should contain a QwestList component', () => {
    expect(wrapper.find(QwestList)).toHaveLength(1)
  })
})
