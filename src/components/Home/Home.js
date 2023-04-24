import "./Home.css";
import { logout } from "../../firebase.js";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../../firebase.js";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Home() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

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

    const storageRef = ref(storage, `photos/${user.photoID}`);
    getDownloadURL(storageRef).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      const img = document.getElementById("photo");
      img.setAttribute("src", url);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="home text">
      <h1 className="text">Home</h1>
      <label className="text">Name</label>
      {user && <p placeholder="Name">{user.name}</p>}
      <p></p>
      <label className="text">Date of Birth</label>
      {user && <p placeholder="Date of Birth">{user.birthYear}</p>}
      <p></p>
      <label className="text">Photo</label>
      {user && <img id="photo" alt="Preview" width="300"></img>}
      <p>
        <Button variant="contained" color="primary" onClick={logoutHandler}>
          Logout
        </Button>
      </p>
    </div>
  );
}

export default Home;
