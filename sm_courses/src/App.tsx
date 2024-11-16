import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import CoursePage from "./pages/coursePage";
import TeacherPage from "./pages/teacherPage";
import AddCursoPage from "./pages/addCourse";
import AddCertificadoPage from "./pages/addCertificado";
import AddProfessorPage from "./pages/addProfessor";
import AddAulaPage from "./pages/addAula";
import AddEditCursoAulaPage from "./pages/editCourse";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/Curso/:id/:aulaId?' element={<CoursePage />} />
        <Route path='/PainelTutor' element={<TeacherPage />} /> 
        <Route path='/PainelTutor/AdicionarCurso' element={<AddCursoPage />} />
        <Route path='/PainelTutor/EditarCurso/:id' element={<AddEditCursoAulaPage />} />
        <Route path="/PainelTutor/AdicionarAula" element={<AddAulaPage />} />
        <Route path="/certificados/adicionar" element={<AddCertificadoPage />} />
        <Route path="/professores/adicionar" element={<AddProfessorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
