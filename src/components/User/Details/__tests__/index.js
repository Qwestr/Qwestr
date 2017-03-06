import React from 'react'
import { shallow } from 'enzyme'
import UserDetails from '../'

it('renders without crashing', () => {
  shallow(<UserDetails />)
})
