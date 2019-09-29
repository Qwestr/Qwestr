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

  it('should contain a form element to create a qwest', () => {
    expect(wrapper.find('form')).toHaveLength(1)
  })

  it('should contain a form submit button element to submit the form', () => {
    expect(wrapper.find('form button')).toHaveLength(1)
  })

  it('should call the onSubmit method property when the form is submitted', () => {
    const onSubmit = jest.fn()
    wrapper.setProps({
      onSubmit: onSubmit
    })
    wrapper.find('form').simulate('submit')
    expect(onSubmit).toHaveBeenCalled()
  })
})
