import React from 'react'
import { shallow } from 'enzyme'
import NotFound from '../'

it('renders without crashing', () => {
  shallow(<NotFound />)
})
