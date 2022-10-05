import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import RowContainer from "../components/RowContainer";
import { APIRegister } from "../utils/apiQueries";

export default function RegisterPage() {
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    if (credentials.login.trim().length === 0) {
      setError("Login must contain at least 3 characters.");
      return false;
    }
    if (credentials.password !== credentials.confirm_password) {
      setError("Password doesn't match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const { login, password } = credentials;
    const response = await APIRegister({ login, password });
    if (response) {
      setError(`${response}\n Redirecting to login page.`);
      setTimeout(() => history.push("/login"), 2000);
    }
  };

  return (
    <div className={"registerPage"}>
      <RowContainer>
        <form className={"registerPage__form"} onSubmit={handleSubmit}>
          <label className={"registerPage__label"}>
            <p className={"registerPage__label"}>Login</p>
            <input
              value={credentials.login}
              name={"login"}
              onChange={handleCredentials}
              type={"text"}
              placeholder={"Enter your login"}
              className={"registerPagee__label registerPage__label__input-text"}
            />
          </label>
          <label className={"registerPage__label"}>
            <p className={"registerPage__label"}>Password</p>
            <input
              value={credentials.password}
              name={"password"}
              onChange={handleCredentials}
              type={"password"}
              placeholder={"Enter your password"}
              className={"registerPage__label registerPage__label__input-text"}
            />
          </label>
          <label className={"registerPage__label"}>
            <p className={"registerPage__label"}>Confirm password</p>
            <input
              value={credentials.confirm_password}
              name={"confirm_password"}
              onChange={handleCredentials}
              type={"password"}
              placeholder={"Confirm password"}
              className={"registerPage__label registerPage__label__input-text"}
            />
          </label>
          {error && <p className={"registerError"}>{`${error}`}</p>}
          <button className={"registerPage__btn"}>Register</button>
          <p className={"registerInfo"}>
            Already got account? Go to <Link to={"/login"}>login page</Link>!
          </p>
        </form>
      </RowContainer>
    </div>
  );
}
