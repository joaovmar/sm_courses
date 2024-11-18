import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal } from "../components/Container";

const EditAlunoPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aluno, setAluno] = useState<any>({
        nome: "",
        email: "",
        certificados: [],
        cursos: [],
    });
    const [senha, setSenha] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchAluno = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/alunos/${id}/`);
                setAluno(response.data);
            } catch (error) {
                setErrorMessage("Erro ao buscar os dados do aluno.");
            }
        };

        fetchAluno();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedAluno = { ...aluno, senha };
            await axios.put(`http://localhost:8000/alunos/${id}/`, updatedAluno);
            navigate("/Gerenciamento/Usuario");
        } catch (error) {
            setErrorMessage("Erro ao atualizar o aluno.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAluno({ ...aluno, [name]: value });
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <div className="p-4 text-white">
                    <h1 className="text-2xl font-bold mb-4">Editar Aluno</h1>

                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="nome"
                                value={aluno.nome}
                                onChange={handleChange}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={aluno.email}
                                onChange={handleChange}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Senha:</label>
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="col-span-2 text-white font-bold rounded p-4 bg-blue-500 hover:bg-blue-300 hover:text-black"
                        >
                            Salvar Alterações
                        </button>
                    </form>
                </div>
            </ContainerContent>
        </ContainerPrincipal>
    );
};

export default EditAlunoPage;
