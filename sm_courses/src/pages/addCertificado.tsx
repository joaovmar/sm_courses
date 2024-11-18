import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerContent, ContainerPrincipal, ContainerTable } from "../components/Container";
import axios from "axios";

const AddCertificadoPage: React.FC = () => {
    const [descricao, setDescricao] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleAddCertificado = async (e: React.FormEvent) => {
        e.preventDefault();
        const novoCertificado = {
            descricao,
        };

        try {
            const response = await axios.post("http://127.0.0.1:8000/certificados/", novoCertificado);
            
            if (response.status === 201) {
                navigate("/certificados"); // Altere a rota para a página desejada após adicionar
            } else {
                setErrorMessage("Falha ao adicionar o certificado.");
            }
        } catch (error) {
            setErrorMessage(`Erro ao adicionar o certificado: ${error}`);
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <h2 className="text-white mb-2 font-extrabold text-2xl">Adicionar Novo Certificado</h2>
                <ContainerTable>
                    <form onSubmit={handleAddCertificado} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col mb-3 col-span-2">
                            <label>Descrição do Certificado:</label>
                            <input
                                type="text"
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
                            Adicionar Certificado
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

export default AddCertificadoPage;
