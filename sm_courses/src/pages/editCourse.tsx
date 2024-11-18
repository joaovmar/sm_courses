import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContainerContent, ContainerPrincipal, ContainerTable } from "../components/Container";
import axios from "axios";
import { MdLibraryAdd } from "react-icons/md";

interface Curso {
    id: number;
    nome: string;
    descricao: string;
    certificado: number;
    professor: number;
    tipo: string;
}

interface Aula {
    id: number;
    nome: string;
    descricao: string;
    url: string;
}

interface Certificado {
    id: number;
    descricao: string;
}

interface Professor {
    id: number;
    nome: string;
}

const AddEditCursoAulaPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [cursoId, setCursoId] = useState<number | null>(null);
    const [nomeCurso, setNomeCurso] = useState("");
    const [descricaoCurso, setDescricaoCurso] = useState("");
    const [certificadoId, setCertificadoId] = useState<number | null>(null);
    const [professorId, setProfessorId] = useState<number | null>(null);
    const [tipoCurso, setTipoCurso] = useState("");
    const [aulas, setAulas] = useState<Aula[]>([{ id: 0, nome: "", descricao: "", url: "" }]);
    const [certificados, setCertificados] = useState<Certificado[]>([]);
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const fetchCursoData = async () => {
        try {
            if (id) {
                const cursoResponse = await axios.get(`http://127.0.0.1:8000/cursos/${id}/`);
                setCursoId(cursoResponse.data.id);
                setNomeCurso(cursoResponse.data.nome);
                setDescricaoCurso(cursoResponse.data.descricao);
                setCertificadoId(cursoResponse.data.certificado);
                setProfessorId(cursoResponse.data.professor);
                setTipoCurso(cursoResponse.data.tipo);

                const aulasResponse = await axios.get(`http://127.0.0.1:8000/aulas/?curso=${id}`);
                setAulas(aulasResponse.data);
            }
        } catch (error) {
            setErrorMessage(`Erro ao carregar os dados do curso: ${error}`);
        }
    };

    const fetchCertificadosProfessores = async () => {
        try {
            const certificadosResponse = await axios.get("http://127.0.0.1:8000/certificados/");
            setCertificados(certificadosResponse.data);

            const professoresResponse = await axios.get("http://127.0.0.1:8000/professores/");
            setProfessores(professoresResponse.data);
        } catch (error) {
            setErrorMessage(`Erro ao carregar certificados ou professores: ${error}`);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let cursoResponse;
            if (cursoId) {
                cursoResponse = await axios.put(`http://127.0.0.1:8000/cursos/${cursoId}/`, {
                    nome: nomeCurso,
                    descricao: descricaoCurso,
                    certificado: certificadoId,
                    professor: professorId,
                    tipo: tipoCurso,
                });
            } else {
                cursoResponse = await axios.post("http://127.0.0.1:8000/cursos/", {
                    nome: nomeCurso,
                    descricao: descricaoCurso,
                    certificado: certificadoId,
                    professor: professorId,
                    tipo: tipoCurso,
                });
                setCursoId(cursoResponse.data.id);
            }

            const cursoID = cursoResponse.data.id;
            for (const aula of aulas) {
                if (aula.id) {
                    await axios.put(`http://127.0.0.1:8000/aulas/${aula.id}/`, aula);
                } else {
                    await axios.post("http://127.0.0.1:8000/aulas/", { ...aula, curso: cursoID });
                }
            }

            navigate("/teacher");
        } catch (error) {
            setErrorMessage(`Erro ao salvar curso ou aulas: ${error}`);
        }
    };

    const handleAddAula = () => {
        setAulas([...aulas, { id: 0, nome: "", descricao: "", url: "" }]);
    };

    const handleRemoveAula = (index: number) => {
        setAulas(aulas.filter((_, i) => i !== index));
    };

    const handleAulaChange = (index: number, field: keyof Aula, value: string) => {
        const updatedAulas = [...aulas];
        updatedAulas[index][field] = value;
        setAulas(updatedAulas);
    };

    useEffect(() => {
        fetchCursoData();
        fetchCertificadosProfessores();
    }, [id]);

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <h2 className="text-white mb-4 font-extrabold text-2xl">
                    {cursoId ? "Editar Curso e Aulas" : "Adicionar Curso e Aulas"}
                </h2>
                <ContainerTable>
                    <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3">
                            <label>Nome do Curso:</label>
                            <input
                                type="text"
                                value={nomeCurso}
                                onChange={(e) => setNomeCurso(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label>Descrição do Curso:</label>
                            <textarea
                                value={descricaoCurso}
                                onChange={(e) => setDescricaoCurso(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
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
                            <label>Tipo do Curso:</label>
                            <select
                                value={tipoCurso}
                                onChange={(e) => setTipoCurso(e.target.value)}
                                required
                                className="p-2 border rounded"
                            >
                                <option value="">Selecione o Tipo</option>
                                <option value="front-end">Front-End</option>
                                <option value="programacao">Programação</option>
                                <option value="generico">Assuntos gerais</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="text-white font-bold">Aulas:</label>
                            {aulas.map((aula, index) => (
                                <div key={index} className="mb-3 p-3 border border-slate-700 rounded bg-slate-800">
                                    <div className="flex flex-col mb-2 text-white">
                                        <label>Nome da Aula:</label>
                                        <input
                                            type="text"
                                            value={aula.nome}
                                            onChange={(e) => handleAulaChange(index, "nome", e.target.value)}
                                            required
                                            className="p-2 border border-slate-500 rounded bg-slate-700"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-2 text-white">
                                        <label>Descrição:</label>
                                        <textarea
                                            value={aula.descricao}
                                            onChange={(e) => handleAulaChange(index, "descricao", e.target.value)}
                                            required
                                            className="p-2 border border-slate-500 rounded bg-slate-700"
                                        />
                                    </div>
                                    <div className="flex flex-col mb-2 text-white">
                                        <label>URL:</label>
                                        <input
                                            type="text"
                                            value={aula.url}
                                            onChange={(e) => handleAulaChange(index, "url", e.target.value)}
                                            required
                                            className="p-2 border border-slate-500 rounded bg-slate-700"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAula(index)}
                                        className="text-red-500 font-bold hover:text-red-700"
                                    >
                                        Remover Aula
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddAula}
                                className="flex items-center gap-3 mt-2 p-4 text-white rounded bg-blue-500 font-bold hover:bg-blue-700"
                            >
                                <MdLibraryAdd />
                                <p>Adicionar Outra Aula</p>
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="col-start-2 text-white font-bold rounded p-4 bg-blue-500 hover:bg-blue-300 hover:text-black"
                        >
                            Salvar Curso e Aulas
                        </button>
                    </form>
                    {errorMessage && (
                        <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>
                    )}
                </ContainerTable>
            </ContainerContent>
        </ContainerPrincipal>
    )
}

export default AddEditCursoAulaPage;