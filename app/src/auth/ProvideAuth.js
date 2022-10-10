import React, { useState, createContext } from "react";
import { APILogIn, APILogOut } from "../api/apiQueries";

const AuthContext = createContext({});

export function ProvideAuth({ children }) {
  const [auth, setAuth] = useState({});

  const signIn = async (credentials, callback) => {
    const response = await APILogIn(credentials);
    if (response.token) {
      setAuth({
        user: response.login,
        token: response.token,
        refreshToken: response.refreshToken,
      });
      callback();
    } else {
      return response;
    }
  };

  const signOut = async (refreshToken, callback) => {
    const response = await APILogOut(refreshToken);
    if (response.ok) {
      setAuth({});
      callback();
    }
  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
