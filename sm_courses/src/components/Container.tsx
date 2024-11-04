import { ReactNode } from "react";
import { Container } from "react-dom";

interface ContainerProps {
    children: ReactNode;
    className?: string; // Agora a rota é obrigatória para garantir o redirecionamento dinâmico
}


export function ContainerPrincipal({children, className}: ContainerProps){
    return(
        <div className={`flex flex-col min-h-screen ${className}`}>
            {children}
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