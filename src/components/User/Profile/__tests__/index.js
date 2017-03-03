import React from 'react'
import { shallow } from 'enzyme'
import UserProfile from '../'

it('renders without crashing', () => {
  shallow(<UserProfile />)
})
