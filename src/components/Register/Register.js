import "./Register.css";
import { useState } from "react";
import { registerWithEmailAndPassword } from "../../firebase.js";
import { Link } from "react-router-dom";

function Setup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const registerHandler = () => {
    registerWithEmailAndPassword(email, email, password);
  };

  return (
    <div className="register">
      <h1 className="text">Register</h1>
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
        <input type="button" value="Register" onClick={registerHandler}></input>
      </p>
      <p>
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Setup;
