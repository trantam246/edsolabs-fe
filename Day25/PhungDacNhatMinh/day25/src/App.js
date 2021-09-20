import React from "react";
import "./Sass/main.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./HomePage/login/Login";
import Timer from "./HomePage/Timer";
import Report from "./HomePage/Report";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Timer">
          <Timer />
        </Route>
        <Route path="/Report">
          <Report />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
