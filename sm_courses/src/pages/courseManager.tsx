import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContainerContent, ContainerPrincipal } from "../components/Container";
import { BiEditAlt } from "react-icons/bi";

const CourseManagementPage: React.FC = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [certificates, setCertificates] = useState<any[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [selectedCertificates, setSelectedCertificates] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseResponse = await axios.get("http://localhost:8000/cursos/"); // Endpoint para cursos
                const certificateResponse = await axios.get("http://localhost:8000/certificados/"); // Endpoint para certificados

                setCourses(courseResponse.data);
                setCertificates(certificateResponse.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
                setErrorMessage("Erro ao buscar os dados.");
            }
        };

        fetchData();
    }, []);

    const handleSelectCourse = (id: number) => {
        setSelectedCourses((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((courseId) => courseId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAllCourses = () => {
        const allIds = courses.map((course) => course.id);
        if (selectedCourses.length === allIds.length) {
            setSelectedCourses([]);
        } else {
            setSelectedCourses(allIds);
        }
    };

    const handleSelectCertificate = (id: number) => {
        setSelectedCertificates((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((certificateId) => certificateId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAllCertificates = () => {
        const allIds = certificates.map((certificate) => certificate.id);
        if (selectedCertificates.length === allIds.length) {
            setSelectedCertificates([]);
        } else {
            setSelectedCertificates(allIds);
        }
    };

    const handleDeleteCourses = async () => {
        if (!window.confirm("Tem certeza de que deseja excluir os cursos selecionados?")) return;

        try {
            await Promise.all(
                selectedCourses.map(async (id) => {
                    await axios.delete(`http://localhost:8000/cursos/${id}/`);
                })
            );

            setCourses(courses.filter((course) => !selectedCourses.includes(course.id)));
            setSelectedCourses([]);
        } catch (error) {
            setErrorMessage("Erro ao excluir os cursos selecionados.");
        }
    };

    const handleDeleteCertificates = async () => {
        if (!window.confirm("Tem certeza de que deseja excluir os certificados selecionados?")) return;

        try {
            await Promise.all(
                selectedCertificates.map(async (id) => {
                    await axios.delete(`http://localhost:8000/certificados/${id}/`);
                })
            );

            setCertificates(certificates.filter((certificate) => !selectedCertificates.includes(certificate.id)));
            setSelectedCertificates([]);
        } catch (error) {
            setErrorMessage("Erro ao excluir os certificados selecionados.");
        }
    };

    const handleEditCertificate = (id: number) => {
        window.location.href = `/certificados/editar/${id}`;
    };

    const handleAddCertificate = () => {
        window.location.href = "/certificados/adicionar";
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <div className="p-4 text-white">
                    <h1 className="text-2xl font-bold mb-4">Gerenciar Cursos e Certificados</h1>

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    {/* Cursos */}
                    <div className="flex justify-end mb-4 gap-4">
                        <button
                            onClick={handleDeleteCourses}
                            disabled={selectedCourses.length === 0}
                            className={`p-2 bg-red-500 text-white rounded ${
                                selectedCourses.length === 0 && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Excluir Selecionados
                        </button>
                    </div>

                    <h2 className="text-xl font-bold mb-2">Cursos</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="font-extrabold">
                                <th className="border border-gray-300 p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCourses.length === courses.length && courses.length > 0}
                                        onChange={handleSelectAllCourses}
                                    />
                                </th>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Nome</th>
                                <th className="border border-gray-300 p-2">Descrição</th>
                                <th className="border border-gray-300 p-2">Certificado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCourses.includes(course.id)}
                                            onChange={() => handleSelectCourse(course.id)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">{course.id}</td>
                                    <td className="border border-gray-300 p-2">{course.nome}</td>
                                    <td className="border border-gray-300 p-2">{course.descricao}</td>
                                    <td className="border border-gray-300 p-2">
                                        {course.certificado || "Sem Certificado"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Certificados */}
                    <div className="flex justify-end mt-6 mb-4 gap-4">
                        <button
                            onClick={handleDeleteCertificates}
                            disabled={selectedCertificates.length === 0}
                            className={`p-2 bg-red-500 text-white rounded ${
                                selectedCertificates.length === 0 && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Excluir Selecionados
                        </button>
                        <button
                            onClick={handleAddCertificate}
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Criar Novo Certificado
                        </button>
                    </div>

                    <h2 className="text-xl font-bold mb-2">Certificados</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="font-extrabold">
                                <th className="border border-gray-300 p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedCertificates.length === certificates.length && certificates.length > 0}
                                        onChange={handleSelectAllCertificates}
                                    />
                                </th>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Nome</th>
                                <th className="border border-gray-300 p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.map((certificate) => (
                                <tr key={certificate.id} className="text-center">
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCertificates.includes(certificate.id)}
                                            onChange={() => handleSelectCertificate(certificate.id)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">{certificate.id}</td>
                                    <td className="border border-gray-300 p-2">{certificate.descricao}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleEditCertificate(certificate.id)}
                                            className="p-2 bg-yellow-500 text-white rounded mr-2"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ContainerContent>
        </ContainerPrincipal>
    );
};

export default CourseManagementPage;
