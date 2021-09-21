import { BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import './App.css'
import Login from "./components/login/login";
import Report from "./components/report/report";
import Timer from "./components/timer/timer";
import PrivateRoute from "./components/layout/privateRoute";
import PublicRoute from "./components/layout/publicRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Switch>
          <PrivateRoute path="/" component={Timer} exact />
          <PrivateRoute path="/report" component={Report} />
          <PublicRoute path="/login" component={Login} />
        </Switch>
      </Switch>
    </Router>
  );
}

export default App;

