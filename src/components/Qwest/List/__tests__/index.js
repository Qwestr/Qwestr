import React from 'react';
import { shallow } from 'enzyme';
import QwestList from '../';

it('renders without crashing', () => {
  shallow(<QwestList />);
});
