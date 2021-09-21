import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "./common";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return getUser() ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
export default PrivateRoute;
