import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import New from "./Components/MainCards/New";
import Table from "./Components/MainCards/Table";
import MuiTable from "./Components/MainCards/MuiTable";
import Card from "./Components/MainCards/card";
import Header from "./Components/MainCards/Header";
import MenuBar from "./Components/MainCards/MenuBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <Router>
        <Header />
        <MenuBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
