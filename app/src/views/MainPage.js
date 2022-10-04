import React from "react";
import useAuth from "../auth/useAuth";

export default function MainPage() {
  let auth = useAuth();

  return (
    <div className={"mainPage"}>
      <h1>Welcone on ToDo App. Sign in to start.</h1>
    </div>
  );
}
