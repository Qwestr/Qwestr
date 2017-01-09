import React from 'react';
import { mount } from 'enzyme';
import Qwest from '../';

it('renders without crashing', () => {
  mount(<Qwest />);
});
