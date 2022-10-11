import React from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function MainPage() {
  let { auth } = useAuth();

  return (
    <div className={"mainPage"}>
      {auth.user ? (
        <div className={"wrapper"}>
          <h1 className="welcomeMessage">Welcome {auth.user}!</h1>
          <Link to={"/todo"} className={"mainPage__btn"}>
            Check out your todo list!
          </Link>
        </div>
      ) : (
        <h1>Welcone on ToDo App. Sign in to start.</h1>
      )}
    </div>
  );
}
