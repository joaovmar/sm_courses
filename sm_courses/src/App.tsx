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
import UserManagementPage from "./pages/userManager";
import AddAlunoPage from "./pages/addAluno";
import EditUserPage from "./pages/editUser";
import EditAlunoPage from "./pages/editAluno";
import EditProfessorPage from "./pages/editProfessor";
import CourseManagementPage from "./pages/courseManager";
import FirstAccess from "./pages/firstAcess";
import AboutUs from "./pages/aboutUs";
import MeusCursos from "./pages/myCourses";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/PrimeiroAcesso" element={<FirstAccess />} />
        <Route path="/Home" element={<Home />} />
        <Route path='/Curso/:id/:aulaId?' element={<CoursePage />} />
        <Route path='/MeusCursos' element={<MeusCursos />} />
        <Route path='/SobreNos' element={<AboutUs />} />
        <Route path='/PainelTutor' element={<TeacherPage />} /> 
        <Route path='/PainelTutor/AdicionarCurso' element={<AddCursoPage />} />
        <Route path='/PainelTutor/EditarCurso/:id' element={<AddEditCursoAulaPage />} />
        <Route path="/PainelTutor/AdicionarAluno" element={<AddAlunoPage />} />
        <Route path="/PainelTutor/AdicionarProfessor" element={<AddProfessorPage />} />
        <Route path="/PainelTutor/AdicionarAula" element={<AddAulaPage />} />
        <Route path="/certificados/adicionar" element={<AddCertificadoPage />} />
        <Route path="/professores/adicionar" element={<AddProfessorPage />} />
        <Route path="/Gerenciamento/Usuario" element={<UserManagementPage />} />
        <Route path="/Gerenciamento/EditarUsuario/:id" element={<EditUserPage />} />
        <Route path="/Gerenciamento/EditarProfessor/:id" element={<EditProfessorPage />} />
        <Route path="/Gerenciamento/EditarAluno/:id" element={<EditAlunoPage />} />
        <Route path="/Gerenciamento/Curso" element={<CourseManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
