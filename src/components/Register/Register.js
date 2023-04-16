import "./Register.css";
import { useState, useEffect } from "react";
import { registerWithEmailAndPassword, auth } from "../../firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function Setup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/setup");
  }, [user, loading]);

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
