import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal, ContainerTable } from "../components/Container";
import axios from "axios"; // Biblioteca para requisições HTTP

interface Curso {
    id: number;
    nome: string;
}
// Componente funcional principal da página para adicionar aulas
const AddAulaPage: React.FC = () => {
    const [cursoId, setCursoId] = useState<number | null>(null);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [urls, setUrls] = useState<string[]>([""]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
// Função para buscar a lista de cursos do backend
    const fetchCursos = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/cursos/");
            setCursos(response.data);
        } catch (error) {
            setErrorMessage(`Erro ao buscar os cursos: ${error}`);
        }
    };
 // Função para enviar os dados da nova aula para o backend
    const handleAddAula = async (e: React.FormEvent) => {
        e.preventDefault();// Previne o comportamento padrão do formulário
        const novaAula = {
            nome,
            descricao,
            urls,
            curso: cursoId,
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/aulas/", novaAula);
            if (response.status === 201) {
                navigate("/teacher");
            } else {
                setErrorMessage("Falha ao adicionar a aula.");
            }
        } catch (error) {
            setErrorMessage(`Erro ao adicionar a aula: ${error}`);
        }
    };
// Adiciona um novo campo para inserir outra URL
    const handleAddUrlField = () => {
        setUrls([...urls, ""]);
    };
// Remove um campo de URL com base no índice
    const handleRemoveUrlField = (index: number) => {
        setUrls(urls.filter((_, i) => i !== index));
    };
// Atualiza o valor de uma URL com base no índice
    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };
// Busca os cursos assim que o componente é montado
    useEffect(() => {
        fetchCursos();
    }, []);

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <h2 className="text-white mb-2 font-extrabold text-2xl">Adicionar Nova Aula</h2>
                <ContainerTable>
                    <form onSubmit={handleAddAula} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3">
                            <label>Curso:</label>
                            <select
                                value={cursoId ?? ""}
                                onChange={(e) => setCursoId(Number(e.target.value))}
                                required
                                className="p-2 border rounded"
                            >
                                <option value="">Selecione o Curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.id}>
                                        {curso.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Nome da Aula:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
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
                        <div className="col-span-2">
                            <label>URLs das Aulas:</label>
                            {urls.map((url, index) => (
                                <div key={index} className="flex items-center gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => handleUrlChange(index, e.target.value)}
                                        required
                                        className="flex-1 p-2 border rounded"
                                        placeholder={`URL da Aula ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveUrlField(index)}
                                        className="text-red-500 font-bold hover:text-red-700"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddUrlField}
                                className="mt-2 text-blue-500 font-bold hover:text-blue-700"
                            >
                                + Adicionar Outra URL
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="col-start-2 text-white font-bold rounded p-4 bg-blue-500 hover:bg-blue-300 hover:text-black"
                        >
                            Adicionar Aula
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

export default AddAulaPage;
