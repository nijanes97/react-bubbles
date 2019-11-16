import React from "react";
import { Route, Redirect } from "react-router";

const isAuthenticated = () => {
  return sessionStorage.getItem("token") ? true : false;
};
export default function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
