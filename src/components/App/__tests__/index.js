import React from 'react';
import { shallow } from 'enzyme';
import App from '../';

it('renders without crashing', () => {
  const location = {
    pathname: '/'
  };

  shallow(<App location={location}/>);
});
