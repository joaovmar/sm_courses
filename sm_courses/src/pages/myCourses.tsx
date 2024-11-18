import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContainerContentCourses, ContainerPrincipal } from "../components/Container";
import { CursoCard } from "../components/CursoCard";

const MeusCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchAlunoId = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/aluno-id/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            return response.data.aluno_id;
        } catch (error) {
            console.error("Erro ao buscar aluno_id:", error);
            setErrorMessage("Erro ao buscar informações do aluno.");
            return null;
        }
    };

    const fetchCursos = async (alunoId: number) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/alunos/${alunoId}/progresso/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setCursos(response.data);
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
            setErrorMessage("Erro ao buscar seus cursos.");
        }
    };

    useEffect(() => {
        const initialize = async () => {
            const alunoId = await fetchAlunoId();
            if (alunoId) {
                fetchCursos(alunoId);
            }
        };
        initialize();
    }, []);

    return (
        <ContainerPrincipal className="bg-slate-800">
            <h1 className="text-2xl text-white font-bold p-4">Meus Cursos</h1>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <ContainerContentCourses>
                {cursos.length > 0 ? (
                    cursos.map((curso) => (
                        <CursoCard
                            key={curso.curso_id}
                            nome={curso.curso_nome}
                            descricao={curso.descricao}
                            progresso={curso.progresso}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-400">Você ainda não está matriculado em nenhum curso.</p>
                )}
            </ContainerContentCourses>
        </ContainerPrincipal>
    );
};

export default MeusCursos;
