import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RowContainer from "./RowContainer";

import Header from "./Header";

import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import ToDo from "../views/ToDo";
import MainPage from "../views/MainPage";
import PrivateRoute from "../auth/PrivateRoute";
import PersistLogin from "./PersistLogin";

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
            <Route exact path="/" component={MainPage} />
            <PersistLogin exact path="/todo">
              <PrivateRoute>
                <ToDo />
              </PrivateRoute>
            </PersistLogin>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </div>
      </section>
    </Router>
  );
}

export default ToDoApp;
