import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../page/Home/Home'
import Login from '../page/Login/Signin'

const rouster = () => {
  return (
    <Router >
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default rouster
