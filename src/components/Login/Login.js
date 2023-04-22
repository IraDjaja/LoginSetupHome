import "./Login.css";
import { useState, useEffect } from "react";
import {
  loginWithEmailAndPassword,
  auth,
  registerWithEmailAndPassword,
} from "../../firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async () => {
    try {
      await loginWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("loginHandler");
      if (err.code === "auth/user-not-found") {
        registerWithEmailAndPassword(email, email, password);
        navigate("/setup");
      }
    }
  };

  return (
    <div className="login">
      <h1 className="text">Login</h1>
      <p>
        <input
          value={email}
          onChange={emailHandler}
          placeholder="E-mail Address"
        ></input>
      </p>
      <p>
        <input
          type="password"
          value={password}
          onChange={passwordHandler}
          placeholder="Password"
        ></input>
      </p>
      <p>
        <input type="button" value="Login" onClick={loginHandler}></input>
      </p>
    </div>
  );
}

export default Login;
