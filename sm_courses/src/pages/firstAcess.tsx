import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContainerPrincipal } from "../components/Container";
import { Logo } from "../components/Logo";

const FirstAccess: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/alunos/", {
                nome: name,
                email: email,
                senha: password,
            });

            if (response.status === 201) {
                setSuccessMessage("Cadastro realizado com sucesso!");
                setTimeout(() => navigate("/"), 2000); // Redireciona para o login após 2 segundos
            }
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.error || "Erro ao realizar cadastro.");
            } else {
                setErrorMessage("Erro ao realizar cadastro. Verifique sua conexão.");
            }
        }
    };

    return (
        <>
            <div className="flex flex-col min-h-screen bg-slate-800 grid grid-cols-3">
                <div className="col-span-2 flex flex-col gap-14 justify-center items-center pl-96 text-center bg-smCourses_background bg-cover bg-right bg-no-repeat">
                    <Logo className="hover:animate-pulse w-1/3" />
                    <p className="text-white hover:text-black font-bold border hover:border-white rounded w-2/3 p-4 hover:bg-blue-400 text-center">
                        Bem-vindo ao primeiro acesso!
                    </p>
                </div>
                <div className="bg-slate-900 flex flex-col justify-center items-center gap-4 text-black">
                    <Logo className="w-1/4" />
                    <input
                        type="text"
                        className="bg-gray-100 w-2/3 p-4 border border-white rounded-md"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="bg-gray-100 w-2/3 p-4 border border-white rounded-md"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="bg-gray-100 w-2/3 p-4 border border-white rounded-md"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className="bg-gray-100 w-2/3 p-4 border border-white rounded-md"
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <p className="text-red-500 font-bold italic">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-green-500 font-bold italic">{successMessage}</p>
                    )}
                    <button
                        className="bg-blue-950 hover:bg-blue-400 w-2/3 p-4 border border-slate-600 hover:border-black rounded-md text-white font-bold"
                        onClick={handleRegister}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>
        </>
    );
};

export default FirstAccess;
