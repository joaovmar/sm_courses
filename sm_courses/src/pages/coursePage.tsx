import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContainerContentCourses, ContainerCourse, ContainerPrincipal } from "../components/Container";
import axios from "axios";

interface Aula {
  id: number;
  nome: string;
  professor: string;
  duracao: string;
  videoUrl: string;
}

const registrarAula = async (alunoId: number, cursoId: number, aulaId: number) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/registrar-aula-assistida/", {
      aluno_id: alunoId,
      curso_id: cursoId,
      aula_id: aulaId,
    });

    console.log("Progresso atualizado:", response.data.progresso);
  } catch (error) {
    console.error("Erro ao registrar aula assistida:", error);
  }
};

const CoursePage: React.FC = () => {
  const { id, aulaId } = useParams();
  const [aulas, setAulas] = useState<Aula[]>([]);
  const [currentAula, setCurrentAula] = useState<Aula | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const alunoId = Number(localStorage.getItem("user_id")); // Obtém o ID do aluno logado

  const fetchAulas = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/cursos/${id}/aulas/`);
      setAulas(response.data);
      if (response.data.length > 0) {
        const selectedAula = aulaId
          ? response.data.find((aula: Aula) => aula.id === Number(aulaId))
          : response.data[0];
        setCurrentAula(selectedAula || response.data[0]);

        // Registra a aula como assistida no backend
        if (selectedAula) {
          registrarAula(alunoId, Number(id), selectedAula.id);
        }
      }
    } catch (error) {
      setErrorMessage(`Erro ao buscar aulas: ${error}`);
    }
  };

  useEffect(() => {
    fetchAulas();
  }, [id, aulaId]);

  const handleAulaClick = async (aulaId: number) => {
    try {
        const alunoId = localStorage.getItem("user_id"); // Obtenha o ID do aluno logado
        await axios.post("http://127.0.0.1:8000/api/registrar-aula-assistida/", {
            aluno_id: alunoId,
            curso_id: id,
            aula_id: aulaId,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });
        console.log("Aula registrada com sucesso");
    } catch (error) {
        console.error("Erro ao registrar a aula assistida:", error);
    }
    navigate(`/Curso/${id}/${aulaId}`);
  };

  return (
    <ContainerPrincipal>
      <ContainerCourse>
        {currentAula ? (
          <iframe
            src={currentAula.videoUrl}
            className="col-span-3 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentAula.nome}
          ></iframe>
        ) : (
          <p className="text-center text-white">Nenhuma aula selecionada.</p>
        )}
        <div className="flex flex-col gap-8 bg-slate-950 text-white p-4 max-h-screen overflow-y-auto custom-scrollbar">
          {aulas.map((aula) => (
            <div
              key={aula.id}
              className={`bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse ${
                currentAula?.id === aula.id ? "border-green-600" : "border-gray-600"
              }`}
              onClick={() => handleAulaClick(aula.id)}
              style={{ cursor: "pointer" }}
            >
              <h1 className="col-span-2 font-extrabold mb-3">{aula.nome}</h1>
              <p>
                <strong>Professor:</strong> {aula.professor}
              </p>
              <p>
                <strong>Duração:</strong> {aula.duracao}
              </p>
            </div>
          ))}
          {errorMessage && <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>}
        </div>
      </ContainerCourse>
    </ContainerPrincipal>
  );
};

export default CoursePage;
