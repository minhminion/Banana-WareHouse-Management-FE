import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({
  component: Component,
  isAuthenticated,
  to = "/login",
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={to} />
      }
    />
  );
};

export default AuthRoute;
