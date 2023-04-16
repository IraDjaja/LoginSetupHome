import "./Setup.css";
import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth, storage } from "../../firebase.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

function Setup() {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [photo, setPhoto] = useState(null);

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const birthYearHandler = (event) => {
    setBirthYear(event.target.value);
  };

  const photoHandler = (event) => {
    setPhoto(event.target.files[0]);
  };

  const saveHandler = async () => {
    const photoID = `${uuidv4()}.${photo.name.split(".").pop()}`;
    // Uploads the photo.
    const storageRef = ref(storage, `photos/${photoID}`);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.alert("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.alert("canceled");
            break;
          case "storage/unknown":
            console.alert(
              "Unknown error occurred, inspect error.serverResponse"
            );
            break;
          default:
        }
      },
      async () => {
        // Gets the user.
        const q = query(
          collection(db, "users"),
          where("email", "==", auth.currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        let userID = querySnapshot.docs.at(0).id;

        // Updates the user.
        const userRef = doc(db, "users", userID);
        await updateDoc(userRef, {
          name: name,
          birthYear: birthYear,
          photoID: photoID,
        });
      }
    );
  };

  return (
    <div className="setup">
      <h1 className="text">Setup</h1>
      <input value={name} onChange={nameHandler} placeholder="Name"></input>
      <p></p>
      <label className="text">Date of Birth</label>
      <input type="date" value={birthYear} onChange={birthYearHandler}></input>
      <p></p>
      <label className="text">Photo</label>
      <input className="text" type="file" onChange={photoHandler}></input>
      {photo != null && (
        <img alt="Preview" src={URL.createObjectURL(photo)}></img>
      )}

      <p></p>
      <input type="button" value="Save" onClick={saveHandler}></input>
    </div>
  );
}

export default Setup;
