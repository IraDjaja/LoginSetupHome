import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Setup from "./components/Setup/Setup";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/setup" element={<Setup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
