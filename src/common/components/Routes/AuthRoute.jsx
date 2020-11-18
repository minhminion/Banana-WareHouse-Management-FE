import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ENUMS } from "../../constants";

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
        [ENUMS.USER_ROLE.Boss, ...acceptRoles]?.find((item) => item === roleName) ? (
          <Component {...props} />
        ) : (
          <Redirect to={to} />
        )
      }
    />
  );
};

export default AuthRoute;
