import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import EditUser from "./pages/EditUser";
const apiEndPoint = "https://api-o0p6.onrender.com/api/user";

function App() {
  return (
    <Router>
      <div>
        <h1>Gebruikersbeheer</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
