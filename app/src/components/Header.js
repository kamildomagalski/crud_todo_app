import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  const [isLogged, setIsLogged] = useState(false);

  const LogInButton = () => (
    <Link to={"/login"} className={"header__btn"}>
      Log In
    </Link>
  );
  const LogOutButton = () => <button className={"header__btn"}>Log Out</button>;
  return (
    <div className={"header"}>
      <p className={"appTitle"}>ToDo App</p>
      <div className={"userWrapper"}>
        {user ? (
          <p className={"username"}>{user}</p>
        ) : (
          <p className={"username"}>Please log in!</p>
        )}
        {isLogged ? LogOutButton() : LogInButton()}
      </div>
    </div>
  );
}
