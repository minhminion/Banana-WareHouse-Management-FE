import React from "react";
import { Route, Redirect } from "react-router-dom";
import MainLayout from "../../HOCS/MainLayout";

const WithLayoutRoute = ({
  component: Component,
  isAuthenticated = true,
  to = "/login",
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <MainLayout>
            <Component {...props} />
          </MainLayout>
        ) : (
          <Redirect to={to} />
        )
      }
    />
  );
};

export default WithLayoutRoute;
