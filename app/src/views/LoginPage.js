import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import RowContainer from "../components/RowContainer";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  let auth = useAuth();

  const history = useHistory();
  let location = useLocation();
  const userRef = useRef();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.login !== "") {
      const error = await auth.signIn(credentials, () => {
        history.replace(from);
      });
      if (error) {
        setLoginError(error);
      }
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
              ref={userRef}
              autoComplete={"off"}
              required
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
              required
              placeholder={"Enter your password"}
              className={"loginPage__label loginPage__label__input-text"}
            />
          </label>
          {loginError && <p className={"loginError"}>{`${loginError}`}</p>}
          <button className={"loginPage__btn"}>Submit</button>
          <p className={"registerInfo"}>
            Don't have an account? <Link to={"/register"}>Register</Link> now!
          </p>
        </form>
      </RowContainer>
    </div>
  );
}
