import React from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { APILogOut } from "../utils/apiQueries";

export default function Header() {
  let auth = useAuth();
  let history = useHistory();

  const LogInButton = () => (
    <Link to={"/login"} className={"header__btn"}>
      Log In
    </Link>
  );
  const LogOutButton = () => (
    <button
      onClick={async () => {
        await APILogOut(() => history.push("/"));
      }}
      className={"header__btn"}
    >
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
