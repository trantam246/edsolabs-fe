import React from "react";
import ReactDom from "react-dom";
import CssBaseLine from "@material-ui/core/CssBaseline";

import App from "./components/App";
import { ContextProvider } from "./components/ContextProvider";

ReactDom.render(
  <ContextProvider>
    <CssBaseLine />
    <App />
  </ContextProvider>,
  document.querySelector("#root")
);
