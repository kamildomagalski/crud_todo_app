import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import RowContainer from "../components/RowContainer";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const history = useHistory();

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.login !== "") {
      history.push("/todo");
    }
  };
  return (
    <div className={"loginPage"}>
      <RowContainer>
        <form className={"loginPage__form"} onSubmit={handleSubmit}>
          <label className={"loginPage__label"}>
            <p className={"loginPage__label"}>Login</p>
            <input
              value={credentials.login}
              name={"login"}
              onChange={handleCredentials}
              type={"text"}
              placeholder={"Enter your login"}
              className={"loginPage__label loginPage__label__input-text"}
            />
          </label>
          <label className={"loginPage__label"}>
            <p className={"loginPage__label"}>Password</p>
            <input
              value={credentials.password}
              name={"password"}
              onChange={handleCredentials}
              type={"password"}
              placeholder={"Enter your password"}
              className={"loginPage__label loginPage__label__input-text"}
            />
          </label>
          <button className={"loginPage__btn"}>Submit</button>
          <p className={"registerInfo"}>
            Don't have an account? <Link to={"/register"}>Register</Link> now!
          </p>
        </form>
      </RowContainer>
    </div>
  );
}