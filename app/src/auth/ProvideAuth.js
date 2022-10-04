import React, { createContext } from "react";
import useProvideAuth from "./useProvideAuth";

export const authContext = createContext(null);

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
