import { ReactNode } from "react";
import { Container } from "react-dom";
import { Menu } from "./Menu";
import { Footer } from "./Footer";

interface ContainerProps {
    children: ReactNode;
    className?: string; // Agora a rota é obrigatória para garantir o redirecionamento dinâmico
}


export function ContainerPrincipal({children, className}: ContainerProps){
    return(
        <div className={`flex flex-col min-h-screen bg-slate-800 ${className}`}>
            <Menu />
            {children}
            <Footer />
        </div>
    )
}

export function ContainerContentCourses({children, className}: ContainerProps){

    return (
        <div className={`flex-wrap justify-between m-8 flex-grow ${className}`}>
            {children}
        </div>
    )
}

export function ContainerCourse({children, className}: ContainerProps) {
    return (
        <div className="flex-grow grid grid-cols-4">
            {children}
        </div>
    )
}

export function ContainerContent({children, className}: ContainerProps) {
    return (
        <div className={`flex-grow ${className}`}>
            {children}
        </div>
    )
}