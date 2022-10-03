import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RowContainer from "./RowContainer";

import Header from "./Header";

import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import ToDo from "../views/ToDo";
import MainPage from "../views/MainPage";

function ToDoApp() {
  return (
    <Router>
      <section className={"toDoApp"}>
        <div className={"headerContainer"}>
          <RowContainer>
            <Header />
          </RowContainer>
        </div>
        <div className={"container"}>
          <Route exact path="/todo">
            <ToDo />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </div>
      </section>
    </Router>
  );
}

export default ToDoApp;
