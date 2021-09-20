import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Timer from '../Timer/Timer';
import Login from '../Login/Signin';

const rouster = () => {
  return (
    <Router>
      <Switch>
        <Route path="/timer">
          <Timer />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default rouster;
