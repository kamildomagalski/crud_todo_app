import { useContext } from "react";
import AuthContext from "./ProvideAuth";

export default function useAuth() {
  return useContext(AuthContext);
}
