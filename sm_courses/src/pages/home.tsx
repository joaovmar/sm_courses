import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContentCourses, ContainerPrincipal } from "../components/Container";
import { CursoCard } from "../components/CursoCard";
import axios from "axios";

interface Curso {
    id: number;
    nome: string;
    descricao: string;
    tipo: string;
    professor: { nome: string };
}

const Home: React.FC = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const navigate = useNavigate();

    const fetchCursos = async () => {
        try {
            const response = await axios.get("http://localhost:8000/cursos/");
            setCursos(response.data);
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
        }
    };

    const handleView = (id: number) => {
        navigate(`/Curso/${id}`);
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return (
        <ContainerPrincipal className="bg-slate-800">
            <ContainerContentCourses>
                {cursos.map((curso) => (
                    <CursoCard
                        key={curso.id}
                        nome={curso.nome}
                        descricao={curso.descricao}
                        professor={curso.professor.nome}
                        onView={() => navigate(`/Curso/${curso.id}`)} // Adicionando navegação para a página do curso
                    />
                ))}
            </ContainerContentCourses>
        </ContainerPrincipal>
    );
};

export default Home;
