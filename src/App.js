import Login from "./components/Login/Login";
import Setup from "./components/Register/Register";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Setup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
