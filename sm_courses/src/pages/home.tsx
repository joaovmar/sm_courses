import React, { useEffect, useState } from 'react';
import { ContainerContentCourses, ContainerPrincipal } from "../components/Container";
import { CursoCard } from "../components/CursoCard";

interface Curso {
    id: number;
    nome: string;
    descricao: string;
    tipo: string;
    professor: { nome: string };
}

const Home: React.FC = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                // Use a rota configurada para `cursos` no Django
                const response = await fetch('http://localhost:8000/cursos/');
                if (response.ok) {
                    const data = await response.json();
                    setCursos(data);
                } else {
                    console.error("Erro ao buscar cursos:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        };

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
                    />
                ))}
            </ContainerContentCourses>
        </ContainerPrincipal>
    );
}

export default Home;
