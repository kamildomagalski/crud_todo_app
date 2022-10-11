import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

export default function PrivateRoute({ children, ...rest }) {
  let { auth } = useAuth();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        auth?.user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
