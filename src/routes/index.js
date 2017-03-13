import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../components/App'
import Home from '../components/Home'
import Login from '../components/Login'
import QwestCreate from '../components/Qwest/Create'
import QwestList from '../components/Qwest/List'
import QwestDetails from '../components/Qwest/Details'
import UserProfile from '../components/User/Profile'
import UserDetails from '../components/User/Details'
import NotFound from '../components/NotFound'

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
      <Route path="user">
        <IndexRoute component={NotFound} />
        <Route path="profile" component={UserProfile} />
        <Route path=":userId/details" component={UserDetails} />
      </Route>
      <Route path="qwest">
        <IndexRoute component={NotFound} />
        <Route path="new" component={QwestCreate} />
        <Route path="list" component={QwestList} />
        <Route path=":qwestId/details" component={QwestDetails} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

export default Routes
