import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import QwestForm from './QwestForm'

configure({
  adapter: new Adapter()
})

describe('QwestForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<QwestForm></QwestForm>)
  })

  it('should contain an input element for the name of the qwest', () => {
    expect(wrapper.find('input')).toHaveLength(1)
  })

  it('should contain a button element to submit the inputs', () => {
    expect(wrapper.find('button')).toHaveLength(1)
  })

  it('should call the onSubmit method property with the inputted name when the button is clicked', () => {
    // Create the mock function
    const onSubmit = jest.fn()
    // Update the component properties
    wrapper.setProps({
      onSubmit: onSubmit
    })
    wrapper.find('input').simulate('change', { target: { value: 'Test' } })
    // Simulate a click on the button
    wrapper.find('button').simulate('click')
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test'
    })
  })

  it('should not call the onSubmit method property when the form in invalid', () => {
    // Create the mock function
    const onSubmit = jest.fn()
    // Update the component properties
    wrapper.setProps({
      onSubmit: onSubmit
    })
    // Simulate a click on the button
    wrapper.find('button').simulate('click')
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
