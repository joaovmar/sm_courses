import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal, ContainerTable } from "../components/Container";
import axios from "axios";

const AddProfessorPage: React.FC = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [descricao, setDescricao] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleAddProfessor = async (e: React.FormEvent) => {
        e.preventDefault();
        const novoProfessor = { nome, email, descricao };

        try {
            const response = await axios.post("http://127.0.0.1:8000/professores/", novoProfessor);
            if (response.status === 201) {
                navigate("/professores");
            } else {
                setErrorMessage("Falha ao adicionar o professor.");
            }
        } catch (error) {
            setErrorMessage(`Erro ao adicionar o professor: ${error}`);
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <h2 className="text-white mb-2 font-extrabold text-2xl">Adicionar Novo Professor</h2>
                <ContainerTable>
                    <form onSubmit={handleAddProfessor} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Nome do Professor:</label>
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
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Descrição:</label>
                            <textarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                className="p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="col-start-2 text-white font-bold rounded p-4 bg-blue-500 hover:bg-blue-300 hover:text-black"
                        >
                            Adicionar Professor
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

export default AddProfessorPage;
