import "./Login.css";
import { useState, useEffect } from "react";
import {
  db,
  loginWithEmailAndPassword,
  auth,
  registerWithEmailAndPassword,
} from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@material-ui/core/Button";
import { collection, query, where, getDocs } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAuth, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    // Gets the user.
    const q = query(
      collection(db, "users"),
      where("email", "==", auth.currentUser.email)
    );
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.at(0).data();
    setUser(user);
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (userAuth) {
      fetchUser().then(() => {
        if (user != null && user.birthYear) {
          navigate("/home");
        } else {
          navigate("/setup");
        }
      });
    }
  }, [userAuth, user, loading, navigate]);

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
        <Button variant="contained" color="primary" onClick={loginHandler}>
          Login
        </Button>
      </p>
    </div>
  );
}

export default Login;
