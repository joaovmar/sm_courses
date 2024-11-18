import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserPage: React.FC = () => {
    const { id, type } = useParams<{ id: string; type: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        descricao: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let endpoint = "";

                if (type === "user") {
                    endpoint = `http://localhost:8000/users/${id}/`;
                } else if (type === "student") {
                    endpoint = `http://localhost:8000/alunos/${id}/`;
                } else if (type === "professor") {
                    endpoint = `http://localhost:8000/professores/${id}/`;
                }

                const response = await axios.get(endpoint);
                setFormData(response.data);
            } catch (error) {
                setErrorMessage("Erro ao buscar os dados do item.");
            }
        };

        fetchUser();
    }, [id, type]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let endpoint = "";

            if (type === "user") {
                endpoint = `http://localhost:8000/users/${id}/`;
            } else if (type === "student") {
                endpoint = `http://localhost:8000/alunos/${id}/`;
            } else if (type === "professor") {
                endpoint = `http://localhost:8000/professores/${id}/`;
            }

            await axios.put(endpoint, formData);
            navigate("/users");
        } catch (error) {
            setErrorMessage("Erro ao salvar as alterações.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Editar {type === "user" ? "Usuário" : type === "student" ? "Aluno" : "Professor"}</h1>

            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
                <div className="flex flex-col mb-3">
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                </div>

                <div className="flex flex-col mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="p-2 border rounded"
                    />
                </div>

                {type === "professor" && (
                    <div className="flex flex-col mb-3 col-span-2">
                        <label>Descrição:</label>
                        <textarea
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleInputChange}
                            required
                            className="p-2 border rounded"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                >
                    Salvar Alterações
                </button>
            </form>
        </div>
    );
};

export default EditUserPage;
