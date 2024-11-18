import React from "react";
import { ContainerPrincipal, ContainerContent } from "../components/Container";

const AboutUs: React.FC = () => {
    return (
        <ContainerPrincipal>
            <ContainerContent>
                <div className="p-6 text-white">
                    <h1 className="text-4xl font-bold mb-6 text-center">Sobre Nós</h1>
                    <p className="text-lg mb-4">
                        A <strong>SM Courses</strong> é uma plataforma digital de cursos inovadora, criada para transformar a forma como o conhecimento é compartilhado e acessado. Fundada em 2024 como fruto de um projeto do Curso de Ciência da Computação, nossa missão é conectar professores e alunos em um ambiente digital dinâmico, acessível e eficiente.
                    </p>
                    <p className="text-lg mb-4">
                        Na <strong>SM Courses</strong>, professores têm a oportunidade de criar e oferecer seus próprios cursos, além de emitir certificados personalizados para os alunos. Por outro lado, nossos alunos podem assistir a videoaulas no conforto de suas casas, adquirir novos conhecimentos e receber certificações que validam suas conquistas acadêmicas e profissionais.
                    </p>
                    <p className="text-lg mb-4">
                        Estamos comprometidos com a democratização do aprendizado, garantindo que nossos usuários tenham acesso a ferramentas modernas e uma experiência de ensino enriquecedora. Nosso objetivo é ser uma ponte para o futuro da educação, onde tecnologia e conhecimento caminham lado a lado.
                    </p>
                    <p className="text-lg text-center font-semibold">
                        Junte-se à <strong>SM Courses</strong> e seja parte dessa jornada de aprendizado contínuo!
                    </p>
                </div>
            </ContainerContent>
        </ContainerPrincipal>
    );
};

export default AboutUs;
