import React from "react";
import { ContainerContentCourses, ContainerCourse, ContainerPrincipal } from "../components/Container";

const CoursePage: React.FC = () => {
    return (
        <ContainerPrincipal>
            <ContainerCourse>
                <iframe
                    src="https://www.youtube.com/embed/BvgK9g2rbIE"
                    className="col-span-3 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video"
                ></iframe>
                <div className="flex flex-col gap-8 bg-slate-950 text-white p-4 max-h-screen overflow-y-auto custom-scrollbar">
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-green-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    <div className="bg-slate-900 grid grid-cols-2 border p-4 hover:animate-pulse border-gray-600">
                        <h1 className="col-span-2 font-extrabold mb-3">Aprendendo React com Typescript</h1>
                        <p><strong>Professor:</strong> Professor nome</p>
                        <p><strong>Duração:</strong> 2h39min</p>    
                    </div>
                    
                    {/* Outros itens podem ser adicionados aqui */}
                </div>
            </ContainerCourse>
        </ContainerPrincipal>
    )
}

export default CoursePage;