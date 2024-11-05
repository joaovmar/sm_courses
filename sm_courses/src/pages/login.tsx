import React from "react";
import { ContainerPrincipal } from "../components/Container";
import { Logo } from "../components/Logo";

const Login: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-800 bg-slate-800 grid grid-cols-3">
            <div className="col-span-2 flex flex-col gap-14 justify-center items-center pl-96 text-center bg-smCourses_background bg-cover bg-right bg-no-repeat">
                <Logo className={'hover:animate-pulse w-1/3'} />
                <p className="text-white hover:text-black font-bold border hover:border-white rounded w-2/3 p-4 hover:bg-blue-400 text-center">Primeiro acesso</p>
            </div>
            <div className="bg-slate-900 flex flex-col justify-center items-center gap-4 text-black">
                <Logo className={"w-1/4"} />

                <input type="text" className="bg-gray-100 w-2/3 p-4 border border-white rounded-md" placeholder="Usuário"/>
                <input type="password" className="bg-gray-100 w-2/3 p-4 border border-white rounded-md" placeholder="Insira sua senha..."/>
                <p className="italic text-sm text-gray-500 hover:underline hover:text-gray-300">Esqueci a minha senha</p>

                <button className="bg-blue-950 hover:bg-blue-400 w-2/3 p-4 border border-slate-600 hover:border-black rounded-md text-white font-bold">Entrar</button>
            </div>
        </div>
    );
};

export default Login;
