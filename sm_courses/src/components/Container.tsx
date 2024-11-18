import { ReactNode } from "react";
import { Container } from "react-dom";
import { Menu } from "./Menu";
import { Footer } from "./Footer";

// Interface para definir as propriedades aceitas pelos componentes de container
interface ContainerProps {
    children: ReactNode;
    className?: string; // Agora a rota é obrigatória para garantir o redirecionamento dinâmico
}

// Componente principal que encapsula a página inteira
export function ContainerPrincipal({children, className}: ContainerProps){
    return(
         // Define uma estrutura de página com cabeçalho (Menu), conteúdo principal e rodapé (Footer)
        <div className={`flex flex-col min-h-screen bg-slate-800 ${className}`}>
            <Menu />
            {children}
            <Footer />
        </div>
    )
}

// Container para listagem de cursos
export function ContainerContentCourses({children, className}: ContainerProps){
 // Define um layout flexível com espaçamento e crescimento dinâmico
    return (
        <div className={`flex-wrap justify-between m-8 flex-grow ${className}`}>
            {children}
        </div>
    )
}
// Container para exibição individual de cursos
export function ContainerCourse({children, className}: ContainerProps) {
    return (
        // Define um layout em grade com 4 colunas para organizar o conteúdo
        <div className="flex-grow grid grid-cols-4">
            {children}
        </div>
    )
}
// Container genérico para seções de conteúdo dinâmico
export function ContainerContent({children, className}: ContainerProps) {
    return (
         // Espaçamento interno e crescimento dinâmico do conteúdo
        <div className={`flex-grow m-8 ${className}`}>
            {children}
        </div>
    )
}
// Container estilizado para tabelas
export function ContainerTable({children, className}: ContainerProps) {
    return (
        // Define um layout com bordas arredondadas, sombra e fundo escuro
        <div className={`bg-slate-700 p-4 rounded-md shadow-2xl ${className}`}>
            {children}
        </div>
    )
}
