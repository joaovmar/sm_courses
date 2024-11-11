import { useState } from "react";
import { CgHomeScreen, CgProfile, CgUser } from "react-icons/cg";
import { FaHamburger, FaUserEdit } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { GrUserManager } from "react-icons/gr";
import { MdMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { ImExit } from "react-icons/im";

export function Menu() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMenuProfileVisible, setIsMenuProfileVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
        setIsMenuProfileVisible(false); // Fecha o menu de perfil
    };

    const toggleMenuProfile = () => {
        setIsMenuProfileVisible(!isMenuProfileVisible);
        setIsMenuVisible(false); // Fecha o menu principal
    };

    return (
        <ul className="relative flex justify-between gap-8 px-8 py-4 bg-slate-900 text-white">
            <li className="flex items-center gap-1">
                <div 
                    className="text-2xl text-white"
                    onClick={toggleMenu}
                >
                    <GiHamburgerMenu className={`text-2xl ${isMenuVisible ? 'hidden transform transition-all duration-500': ''}`}/>
                    <MdMenuOpen className={`text-2xl ${isMenuVisible ? 'block transform transition-all duration-500': 'hidden transform transition-all duration-500'}`}/>
                </div>
                {}
                {isMenuVisible && (
                    <div className="absolute font-medium top-full left-0 pl-4 min-h-full w-2/3 md:w-3/12 shadow-2xl border-r border-b border-slate-700 rounded-r bg-slate-900">
                        {[
                            { label: 'Home', path: '/home' },
                            { label: 'Meus Cursos', path: '/aboutUs' },
                            { label: 'Painel do Professor', path: '/PainelTutor' },
                            { label: 'Sobre nós', path: '/aboutUs' },
                            { label: 'Gerenciamento - Usuários', path: '/userManager' },
                            { label: 'Gerenciamento - Perfis', path: '/groupManager' },
                            { label: 'Gerenciamento - Cursos', path: '/coursesManager' },
                            { label: 'Sair', path: '/aboutUs' },
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className="mb-4 text-xl cursor-pointer hover:bg-slate-950 hover:scale-105 transform transition-all duration-200"
                            >
                                <Link to={item.path}>
                                    {item.label}
                                </Link>
                                {['Sobre nós', 'Gerenciamento - Cursos'].includes(item.label) && <hr className="border-gray-600"/>}
                            </div>
                        ))}
                    </div>
                )}
                {}
            </li>
            <li className="flex items-center gap-1">
                <Logo className={`w-10`}/>
            </li>
            <li className="flex items-center gap-1">
                <div className="flex items-center gap-1" onClick={toggleMenuProfile}>
                    <CgProfile className="text-2xl"/>
                    Perfil
                </div>
                {}
                {isMenuProfileVisible && (
                    <div className="absolute font-medium top-full right-0 pl-4 min-h-full w-1/3 md:w-2/12 shadow-2xl border-r border-b border-slate-700 rounded-r bg-slate-900">
                        {[
                            {icon: <FaUserEdit /> , label: 'Meu perfil', path: '/home' },
                            {icon: <ImExit />, label: 'Sair', path: '/aboutUs' },
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className="mb-4 text-xl cursor-pointer hover:bg-slate-950 transform transition-all duration-200"
                            >
                                <Link to={item.path} className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </Link>
                                {['Meu perfil'].includes(item.label) && <hr className="border-gray-600"/>}
                            </div>
                        ))}
                    </div>
                )}
                {}
            </li>
        </ul>
    )
}