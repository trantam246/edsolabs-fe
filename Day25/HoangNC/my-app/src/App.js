import { BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import Signin from "./components/signin/login";
import Report from "./components/report/report";
import Timer from "./components/timer/timer";
import PrivateRoute from "./components/common/privateRoute";
import PublicRoute from "./components/common/publicRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Switch>
          <PrivateRoute path="/" component={Timer} exact />
          <PrivateRoute path="/report" component={Report} />
          <PublicRoute path="/login" component={Signin} />
        </Switch>
      </Switch>
    </Router>
  );
}

export default App;
