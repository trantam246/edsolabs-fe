import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import LogIn from "../../src/pages/LogIn";
import Home from "../../src/pages/Home";
import { useGlobalContext } from "./ContextProvider";
import history from "../history";

export default function App() {
  const { user } = useGlobalContext();
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={LogIn} exact />
          <Route path="/">{user ? <Home /> : <Redirect to="/login" />}</Route>
        </Switch>
      </Router>
    </>
  );
}
