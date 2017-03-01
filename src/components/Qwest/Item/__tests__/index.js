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

  it('successfully renders the component using passed-in properties', () => {
    // Mount the component
    const action = {
      title: 'Test Title',
      style: 'success',
      event: jest.fn()
    }
    const wrapper = mount(<ActionButton action={action}/>)

    // Expect that the passed-in values exist
    expect(wrapper.text()).toBe(action.title)
    expect(wrapper.find(Button).prop('bsStyle')).toBe(action.style)
    expect(wrapper.find(Button).prop('onClick')).toBe(action.event)
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

describe('<ActionButtonGroup />', () => {
  it('successfully renders the component using default properties', () => {
    // Mount the component
    const wrapper = mount(<ActionButtonGroup />)

    // Expect that the default values exist
    expect(wrapper.find(ActionButton)).toHaveLength(1)
    expect(wrapper.find(ActionButton).prop('action')).toBe(ActionButtonGroup.defaultProps.actions[0])
  })

  it('successfully renders the component using passed-in properties', () => {
    // Mount the component
    const actions = [{
      title: 'Test Title',
      style: 'success',
      event: jest.fn()
    }]
    const wrapper = mount(<ActionButtonGroup actions={actions}/>)

    // Expect that the passed-in values exist
    expect(wrapper.find(ActionButton)).toHaveLength(1)
    expect(wrapper.find(ActionButton).prop('action')).toBe(actions[0])
  })
})
