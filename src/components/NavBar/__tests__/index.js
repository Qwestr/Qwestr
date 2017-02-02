import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../';

it('renders without crashing', () => {
  shallow(<NavBar />);
});
