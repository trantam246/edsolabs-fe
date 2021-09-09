import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";

function App() {
  return (
    <Router>
      <HomePage />
      <Switch>
        <Route exact path="/signout">
          <SignOut />
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
