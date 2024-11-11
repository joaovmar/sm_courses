import React, { useEffect, useState } from "react";
import { ContainerContent, ContainerPrincipal } from "../components/Container";
import { CursoCard } from "../components/CursoCard";

interface Curso {
    id: number;
    nome: string;
    descricao: string;
    professor: { nome: string };
}

const TeacherPage: React.FC = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);

    // Função para buscar todos os cursos da API
    const fetchCursos = async () => {
        try {
            const response = await fetch('http://localhost:8000/cursos/');
            if (!response.ok) throw new Error("Erro ao buscar cursos");
            const data = await response.json();
            setCursos(data);
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
        }
    };

    // Carrega os cursos ao montar o componente
    useEffect(() => {
        fetchCursos();
    }, []);

    // Função para editar curso
    const handleEdit = async (id: number) => {
        const cursoEditado = { nome: "Novo Nome", descricao: "Nova Descrição" }; // Dados de exemplo para edição
        try {
            const response = await fetch(`http://localhost:8000/cursos/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cursoEditado),
            });
            if (!response.ok) throw new Error("Erro ao editar curso");
            fetchCursos(); // Atualiza a lista de cursos após a edição
        } catch (error) {
            console.error("Erro ao editar curso:", error);
        }
    };

    // Função para excluir curso com confirmação
    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza de que deseja excluir este curso?")) return;
        try {
            const response = await fetch(`http://localhost:8000/cursos/${id}/`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Erro ao excluir curso");
            setCursos(cursos.filter((curso) => curso.id !== id)); // Remove o curso excluído da lista
        } catch (error) {
            console.error("Erro ao excluir curso:", error);
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                {cursos.map((curso) => (
                    <CursoCard
                        key={curso.id}
                        nome={curso.nome}
                        descricao={curso.descricao}
                        professor={curso.professor.nome}
                        onEdit={() => handleEdit(curso.id)}
                        onDelete={() => handleDelete(curso.id)}
                    />
                ))}
            </ContainerContent>
        </ContainerPrincipal>
    );
};

export default TeacherPage;
