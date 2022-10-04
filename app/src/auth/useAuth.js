import { useContext } from "react";
import { authContext } from "./ProvideAuth";
export default function useAuth() {
  return useContext(authContext);
}
