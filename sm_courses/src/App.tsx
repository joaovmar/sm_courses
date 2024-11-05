import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import CoursePage from "./pages/coursePage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/Curso/CursoNome/AulaId' element={<CoursePage />} />
      </Routes>
    </Router>
  );
}

export default App;
