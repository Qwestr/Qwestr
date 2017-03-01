import React from 'react'
import { mount } from 'enzyme'
import { Button } from 'react-bootstrap'
import QwestItem, { ActionButton, ActionButtonGroup } from '../'

describe('<ActionButton />', () => {
  it('successfully renders the component using default properties', () => {
    // Mount the component
    const wrapper = mount(<ActionButton />)

    // Expect that the default values exist
    expect(wrapper.text()).toBe(ActionButton.defaultProps.action.title)
    expect(wrapper.find(Button).prop('bsStyle')).toBe(ActionButton.defaultProps.action.style)
    expect(wrapper.find(Button).prop('onClick')).toBe(ActionButton.defaultProps.action.event)
  })

  it('successfully calls the event function when clicked', () => {
    // Mount the component
    const action = {
      event: jest.fn()
    }
    const wrapper = mount(<ActionButton action={action}/>)

    // Simulate the click event
    wrapper.simulate('click')

    // Expect that the event function has been called
    expect(action.event).toHaveBeenCalled()
  })
})

// it('successfully calls the passed in function when clicked', () => {
//   // Mount the component
//   const action = {
//     event: jest.fn()
//   }
//   const wrapper = mount(<ActionButton action={action}/>)
//   console.log('ActionButton: ' + wrapper.html());
//   console.log('ActionButton.defaultProps: ' + JSON.stringify(ActionButton.defaultProps));
//   console.log('ActionButton -> Button: ' + wrapper.find(Button).prop('bsStyle'));
//
//   expect(wrapper.text()).toBe(ActionButton.defaultProps.action.title)
//   expect(wrapper.find(Button).prop('bsStyle')).toBe(ActionButton.defaultProps.action.style)
// })

// it('renders without crashing', () => {
//   const wrapper = mount(<QwestItem />)
//   console.log('QwestItem: ' + wrapper.text());
//   console.log('QwestItem -> .qwest-item-title: ' + wrapper.find('.qwest-item-title').exists());
//   console.log('QwestItem -> ActionButtonGroup: ' + wrapper.find(ActionButton).exists());
// })

// it('renders the proper action buttons for an active Qwest', () => {
//   const actions = [{title: 'Title1'}, {title: 'Title2'}]
//   const wrapper = shallow(<QwestItem />)
//
//   console.log('QwestItem: ' + wrapper.text());
// })
