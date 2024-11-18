import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdMenuOpen } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { ImExit } from "react-icons/im";

export function Menu() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuProfileVisible, setIsMenuProfileVisible] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Recupera o nome do usuário logado do localStorage
        const storedUserName = localStorage.getItem("user_name");
        setUserName(storedUserName || "Usuário");
    }, []);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
        setIsMenuProfileVisible(false); // Fecha o menu de perfil
    };

    const toggleMenuProfile = () => {
        setIsMenuProfileVisible(!isMenuProfileVisible);
        setIsMenuVisible(false); // Fecha o menu principal
    };

    const handleLogout = () => {
        // Remove os dados do localStorage
        localStorage.removeItem("user_name");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redireciona para a página de login
        navigate("/");
    };

    return (
        <ul className="z-50 relative flex justify-between gap-8 px-8 py-4 bg-slate-900 text-white">
            {/* Menu Principal */}
            <li className="flex items-center gap-1">
                <div
                    className="text-2xl text-white"
                    onClick={toggleMenu}
                >
                    <GiHamburgerMenu className={`text-2xl ${isMenuVisible ? "hidden transform transition-all duration-500" : ""}`} />
                    <MdMenuOpen className={`text-2xl ${isMenuVisible ? "block transform transition-all duration-500" : "hidden transform transition-all duration-500"}`} />
                </div>
                {isMenuVisible && (
                    <div className="absolute font-medium top-full left-0 pl-4 min-h-full w-2/3 md:w-3/12 shadow-2xl border-r border-b border-slate-700 rounded-r bg-slate-900 z-50">
                        {[
                            { label: "Home", path: "/home" },
                            { label: "Painel do Professor", path: "/PainelTutor" },
                            { label: "Sobre nós", path: "/SobreNos" },
                            { label: "Gerenciamento - Usuários", path: "/Gerenciamento/Usuario" },
                            { label: "Gerenciamento - Cursos", path: "/Gerenciamento/Curso" },
                            { label: "Sair", path: "/Login", action: handleLogout }, // Logout no menu principal
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="mb-4 text-xl cursor-pointer hover:bg-slate-950 hover:scale-105 transform transition-all duration-200"
                                onClick={item.action || undefined}
                            >
                                {item.path ? (
                                    <Link to={item.path}>
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span>{item.label}</span>
                                )}
                                {["Sobre nós", "Gerenciamento - Cursos"].includes(item.label) && <hr className="border-gray-600" />}
                            </div>
                        ))}
                    </div>
                )}
            </li>
            {/* Logo */}
            <li className="flex items-center gap-1">
                <Logo className="w-10" />
            </li>
            {/* Perfil */}
            <li className="flex items-center gap-1">
                <div className="flex items-center gap-1" onClick={toggleMenuProfile}>
                    <CgProfile className="text-2xl" />
                    {userName}
                </div>
                {isMenuProfileVisible && (
                    <div className="absolute font-medium top-full right-0 pl-4 min-h-full w-1/3 md:w-2/12 shadow-2xl border-r border-b border-slate-700 rounded-r bg-slate-900">
                        {[
                            { icon: <FaUserEdit />, label: `Meu perfil`, path: "/home" },
                            { icon: <ImExit />, label: "Sair", action: handleLogout },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="mb-4 text-xl cursor-pointer hover:bg-slate-950 transform transition-all duration-200"
                                onClick={item.action || undefined}
                            >
                                {item.path ? (
                                    <Link to={item.path} className="flex items-center gap-3">
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        {item.label}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </li>
        </ul>
    );
}
