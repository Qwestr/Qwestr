import React from 'react'
import { shallow } from 'enzyme'
import QwestItem from '../'

it('renders without crashing', () => {
  // const actions = [{title: 'Title1'}, {title: 'Title2'}]
  const wrapper = shallow(<QwestItem />)

  console.log('QwestItem: ' + wrapper.text());
})
