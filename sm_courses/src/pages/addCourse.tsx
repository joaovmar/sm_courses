import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal, ContainerTable } from "../components/Container";
import axios from "axios";

interface Certificado {
    id: number;
    descricao: string;
}

interface Professor {
    id: number;
    nome: string;
}

const AddCursoPage: React.FC = () => {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [certificadoId, setCertificadoId] = useState<number | null>(null);
    const [professorId, setProfessorId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [certificados, setCertificados] = useState<Certificado[]>([]);
    const [professores, setProfessores] = useState<Professor[]>([]);
    const navigate = useNavigate();

    const fetchCertificados = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/certificados/");
            setCertificados(response.data);
        } catch (error) {
            setErrorMessage(`Erro ao buscar os certificados: ${error}`);
        }
    };

    const fetchProfessores = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/professores/");
            setProfessores(response.data);
        } catch (error) {
            setErrorMessage(`Erro ao buscar os professores: ${error}`);
        }
    };

    useEffect(() => {
        fetchCertificados();
        fetchProfessores();
    }, []);

    const handleAddCurso = async (e: React.FormEvent) => {
        e.preventDefault();
        const novoCurso = {
            nome,
            descricao,
            tipo,
            certificado: certificadoId,
            professor: professorId,
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/cursos/", novoCurso);
            if (response.status === 201) {
                navigate("/teacher");
            } else {
                setErrorMessage("Falha ao adicionar o curso.");
            }
        } catch (error) {
            setErrorMessage(`Erro ao adicionar o curso: ${error}`);
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <h2 className="text-white mb-2 font-extrabold text-2xl">Adicionar Novo Curso</h2>
                <ContainerTable>
                    <form onSubmit={handleAddCurso} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3">
                            <label>Nome do Curso:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label>Professor:</label>
                            <select
                                value={professorId ?? ""}
                                onChange={(e) => setProfessorId(Number(e.target.value))}
                                required
                                className="p-2 border rounded"
                            >
                                <option value="">Selecione o Professor</option>
                                {professores.map((prof) => (
                                    <option key={prof.id} value={prof.id}>
                                        {prof.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label>Tipo:</label>
                            <select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                required
                                className="p-2 border rounded"
                            >
                                <option value="">Selecione o Tipo</option>
                                <option value="front-end">Front-End</option>
                                <option value="programacao">Programação</option>
                                <option value="generico">Assuntos gerais</option>
                            </select>
                        </div>
                        <div className="flex flex-col mb-3">
                            <label>Certificado:</label>
                            <select
                                value={certificadoId ?? ""}
                                onChange={(e) => setCertificadoId(Number(e.target.value))}
                                required
                                className="p-2 border rounded"
                            >
                                <option value="">Selecione o Certificado</option>
                                {certificados.map((cert) => (
                                    <option key={cert.id} value={cert.id}>
                                        {cert.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Descrição:</label>
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="col-start-2 text-white font-bold rounded p-4 bg-blue-500 hover:bg-blue-300 hover:text-black"
                        >
                            Adicionar Curso
                        </button>
                    </form>
                    {errorMessage && (
                        <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>
                    )}
                </ContainerTable>
            </ContainerContent>
        </ContainerPrincipal>
    );
};

export default AddCursoPage;
