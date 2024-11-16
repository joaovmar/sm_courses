import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerPrincipal } from "../components/Container";
import { Logo } from "../components/Logo";
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                username: username, // Substitua pelo estado correto
                password: password, // Substitua pelo estado correto
            });
    
            if (response.status === 200) {
                console.log("Login realizado com sucesso!");
                navigate("/Home"); // Redireciona para a página principal
            } else {
                setErrorMessage("Usuário ou senha inválidos.");
            }
        } catch (error: any) {
            if (error.response) {
                console.error("Erro na autenticação:", error.response.data);
                setErrorMessage(error.response.data.error || "Erro ao autenticar.");
            } else {
                setErrorMessage("Erro ao autenticar. Verifique sua conexão.");
            }
        }
    };
    
    

    return (
        <div className="flex flex-col min-h-screen bg-slate-800 grid grid-cols-3">
            <div className="col-span-2 flex flex-col gap-14 justify-center items-center pl-96 text-center bg-smCourses_background bg-cover bg-right bg-no-repeat">
                <Logo className="hover:animate-pulse w-1/3" />
                <p className="text-white hover:text-black font-bold border hover:border-white rounded w-2/3 p-4 hover:bg-blue-400 text-center">Primeiro acesso</p>
            </div>
            <div className="bg-slate-900 flex flex-col justify-center items-center gap-4 text-black">
                <Logo className="w-1/4" />
                <input
                    type="text"
                    className="bg-gray-100 w-2/3 p-4 border border-white rounded-md"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="bg-gray-100 w-2/3 p-4 border border-white rounded-md"
                    placeholder="Insira sua senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <p className="text-red-500 font-bold italic">{errorMessage}</p>
                )}
                <p className="italic text-sm text-gray-500 hover:underline hover:text-gray-300">Esqueci a minha senha</p>
                <button
                    className="bg-blue-950 hover:bg-blue-400 w-2/3 p-4 border border-slate-600 hover:border-black rounded-md text-white font-bold"
                    onClick={handleLogin}
                >
                    Entrar
                </button>
            </div>
        </div>
    );
};

export default Login;
