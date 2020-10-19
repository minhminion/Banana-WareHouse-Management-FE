import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({
  component: Component,
  acceptRoles,
  roleName,
  to = "/404",
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        acceptRoles?.find((item) => item === roleName) ? (
          <Component {...props} />
        ) : (
          <Redirect to={to} />
        )
      }
    />
  );
};

export default AuthRoute;
