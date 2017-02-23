import React from 'react'
import { shallow } from 'enzyme'
import Login from '../'

it('renders without crashing', () => {
  shallow(<Login />)
})
