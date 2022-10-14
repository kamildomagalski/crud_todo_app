import React, { useState, useEffect, createContext } from "react";
import { APILogIn, APILogOut } from "../api/apiQueries";

const AuthContext = createContext({});

export function ProvideAuth({ children }) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const signIn = async (credentials, callback) => {
    const response = await APILogIn(credentials);
    if (response.token) {
      setAuth({
        user: response.login,
        token: response.token,
      });
      callback();
    } else {
      return response;
    }
  };

  const signOut = async (callback) => {
    const isLoggedOut = await APILogOut();
    if (isLoggedOut) {
      setAuth({});
      callback();
    }
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, signIn, signOut, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
