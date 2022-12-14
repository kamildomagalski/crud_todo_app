import React from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Header() {
  let { auth, signOut } = useAuth();
  let history = useHistory();
  const handleLogOut = async () => {
    await signOut(() => history.push("/"));
  };
  const LogInButton = () => (
    <Link to={"/login"} className={"header__btn"}>
      Log In
    </Link>
  );
  const LogOutButton = () => (
    <button onClick={handleLogOut} className={"header__btn"}>
      Log Out
    </button>
  );
  return (
    <div className={"header"}>
      <Link to={"/"} className={"appTitle"}>
        ToDo App
      </Link>
      <div className={"userWrapper"}>
        {auth.user ? (
          <p className={"username"}>{auth.user}</p>
        ) : (
          <p className={"username"}>Please log in!</p>
        )}
        {auth.user ? LogOutButton() : LogInButton()}
      </div>
    </div>
  );
}
