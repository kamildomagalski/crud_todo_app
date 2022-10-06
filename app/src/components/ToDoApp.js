import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RowContainer from "./RowContainer";

import Header from "./Header";

import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import ToDo from "../views/ToDo";
import MainPage from "../views/MainPage";
import PrivateRoute from "../auth/PrivateRoute";

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
          <Switch>
            <PrivateRoute exact path="/todo">
              <ToDo />
            </PrivateRoute>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </div>
      </section>
    </Router>
  );
}

export default ToDoApp;
