import "./Setup.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  const saveHandler = () => {};

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
