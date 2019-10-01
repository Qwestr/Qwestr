import React from 'react'
import { shallow } from 'enzyme'
import Routes from '../'

it('renders without crashing', () => {
  shallow(<Routes />)
})
