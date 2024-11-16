import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal } from "../components/Container";
import { CursoCard } from "../components/CursoCard";
import { BiPlusCircle } from "react-icons/bi";
import { MdDelete, MdLibraryAdd } from "react-icons/md";

interface Curso {
    id: number;
    nome: string;
    descricao: string;
    professor: { nome: string };
}

const TeacherPage: React.FC = () => {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const navigate = useNavigate();

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


    useEffect(() => {
        fetchCursos();
    }, []);

    const handleDeleteAll = async () => {
        if (!window.confirm("Tem certeza de que deseja excluir todos os cursos?")) return;
        try {
            await Promise.all(cursos.map(async (curso) => {
                const response = await fetch(`http://localhost:8000/cursos/${curso.id}/`, { method: "DELETE" });
                if (!response.ok) throw new Error("Erro ao excluir curso");
            }));
            setCursos([]);
        } catch (error) {
            console.error("Erro ao excluir cursos:", error);
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/PainelTutor/EditarCurso/${id}`);
    };
    
    const handleDelete = async (id: number) => {
        if (!window.confirm("Tem certeza de que deseja excluir este curso?")) return;
        try {
            const response = await fetch(`http://localhost:8000/cursos/${id}/`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Erro ao excluir curso");
            setCursos(cursos.filter((curso) => curso.id !== id));
        } catch (error) {
            console.error("Erro ao excluir curso:", error);
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <div style={{ marginBottom: "20px" }} className="flex justify-end gap-4">
                    <button 
                        onClick={() => navigate('/PainelTutor/AdicionarCurso')}
                        className="flex items-center rounded gap-3 p-4 font-bold text-white bg-blue-500 hover:bg-blue-300 hover:text-black">
                        <BiPlusCircle />
                        <p>Novo Curso</p>
                    </button>
                    <button 
                        onClick={() => navigate('/PainelTutor/AdicionarAula')}
                        className="flex items-center rounded gap-3 p-4 font-bold text-white bg-green-500 hover:bg-green-300 hover:text-black">
                        <MdLibraryAdd />
                        <p>Adicionar Aulas</p>
                    </button>
                </div>
                {cursos.map((curso) => (
                    <CursoCard
                        key={curso.id}
                        nome={curso.nome}
                        descricao={curso.descricao}
                        professor={curso.professor?.nome || "Professor não definido"}
                        onEdit={() => handleEdit(curso.id)}
                        onDelete={() => handleDelete(curso.id)}
                    />
                ))}

            </ContainerContent>
        </ContainerPrincipal>
    );
};

export default TeacherPage;
