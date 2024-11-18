import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerPrincipal } from "../components/Container";
import { Logo } from "../components/Logo";
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login/", {
                username,
                password,
            });

            if (response.status === 200) {
                // Salva o token e o nome do usuário no localStorage
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                localStorage.setItem("user_name", response.data.username); // Salva o nome do usuário

                // Redireciona para a página principal
                navigate("/Home");
            } else {
                setErrorMessage("Usuário ou senha inválidos.");
            }
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.detail || "Erro ao autenticar.");
            } else {
                setErrorMessage("Erro ao autenticar. Verifique sua conexão.");
            }
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-800 grid grid-cols-3">
            <div className="col-span-2 flex flex-col gap-14 justify-center items-center pl-96 text-center bg-smCourses_background bg-cover bg-right bg-no-repeat">
                <Logo className="hover:animate-pulse w-1/3" />
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
                {errorMessage && <p className="text-red-500 font-bold italic">{errorMessage}</p>}
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
