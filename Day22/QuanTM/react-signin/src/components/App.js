import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Authentication from "./Authentication";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/", "/signup"]} component={Authentication} />
      </Switch>
    </BrowserRouter>
  );
}
