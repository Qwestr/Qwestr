import React from 'react';
import { mount } from 'enzyme';
import NavBar from '../';

it('renders without crashing', () => {
  mount(<NavBar />);
});
