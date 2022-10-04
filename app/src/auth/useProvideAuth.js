import { useState } from "react";
import { APILogIn, APILogOut } from "../utils/apiQueries";

export default function useProvideAuth() {
  const [user, setUser] = useState(null);
  console.log(user);

  const signIn = async (credentials, callback) => {
    const response = await APILogIn(credentials);
    if (response.token) {
      setUser(credentials.login);
      callback();
    } else {
      return response;
    }
  };

  const signOut = async (refreshToken, callback) => {
    const response = await APILogOut(refreshToken);
    if (response.ok) {
      setUser(null);
      callback();
    }
    console.log(user);
    setUser(null);
    callback();
  };

  return {
    user,
    signIn,
    signOut,
  };
}
