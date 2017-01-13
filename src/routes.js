import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Qwest from './components/Qwest';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="qwest/new" component={Qwest} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
