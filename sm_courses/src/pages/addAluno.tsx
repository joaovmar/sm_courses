import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal, ContainerTable } from "../components/Container";
import axios from "axios";

const AddAlunoPage: React.FC = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleAddAluno = async (e: React.FormEvent) => {
        e.preventDefault();
        const novoAluno = {
            nome,
            email,
            certificados: [], // Enviar como array vazio caso não tenha
            cursos: [] // Enviar como array vazio caso não tenha
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/alunos/", novoAluno);
            if (response.status === 201) {
                navigate("/alunos"); // Redirecionar conforme necessário
            } else {
                setErrorMessage("Falha ao adicionar o aluno.");
            }
        } catch (error) {
            setErrorMessage(`Erro ao adicionar o aluno: ${error}`);
            console.error(error.response?.data); // Mostra o erro detalhado no console
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <h2 className="text-white mb-2 font-extrabold text-2xl">Adicionar Novo Aluno</h2>
                <ContainerTable>
                    <form onSubmit={handleAddAluno} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Nome do Aluno:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="col-start-2 text-white font-bold rounded p-4 bg-blue-500 hover:bg-blue-300 hover:text-black"
                        >
                            Adicionar Aluno
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

export default AddAlunoPage;
