import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../auth/useAuth";

const PersistLogin = ({ children, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.token && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth.token, refresh, persist]);

  return (
    <Route
      {...rest}
      render={() =>
        !persist ? children : isLoading ? <p>Loading...</p> : children
      }
    />
  );
};

export default PersistLogin;
