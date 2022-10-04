import React, { createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RowContainer from "./RowContainer";

import Header from "./Header";

import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import ToDo from "../views/ToDo";
import MainPage from "../views/MainPage";
import ProvideAuth from "../auth/ProvideAuth";
import PrivateRoute from "../auth/PrivateRoute";

function ToDoApp() {
  return (
    <ProvideAuth>
      <Router>
        <section className={"toDoApp"}>
          <div className={"headerContainer"}>
            <RowContainer>
              <Header />
            </RowContainer>
          </div>
          <div className={"container"}>
            <Switch>
              <PrivateRoute exact path="/todo">
                <ToDo />
              </PrivateRoute>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
            </Switch>
          </div>
        </section>
      </Router>
    </ProvideAuth>
  );
}

export default ToDoApp;
