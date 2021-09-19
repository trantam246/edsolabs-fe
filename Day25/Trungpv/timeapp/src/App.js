import React from "react";
// import "./Sass/main.scss";
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Timer from "./pages/Timer";
import Report from "./pages/Report";

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