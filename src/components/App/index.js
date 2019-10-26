import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from '../Layout'
import { withAuthentication } from '../Session'

const App = () => (
  <Router>
    <Layout />
  </Router>
)

export default withAuthentication(App)
