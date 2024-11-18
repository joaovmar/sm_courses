import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContainerContent, ContainerPrincipal } from "../components/Container";

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, studentResponse, professorResponse] = await Promise.all([
                    axios.get("http://localhost:8000/users/"), // Endpoint para usuários
                    axios.get("http://localhost:8000/alunos/"), // Endpoint para alunos
                    axios.get("http://localhost:8000/professores/") // Endpoint para professores
                ]);

                const userData = userResponse.data.map((user: any) => ({ ...user, group: "Admin" }));
                const studentData = studentResponse.data.map((student: any) => ({ ...student, group: "Aluno" }));
                const professorData = professorResponse.data.map((professor: any) => ({ ...professor, group: "Professor" }));

                setUsers([...userData, ...studentData, ...professorData]);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
                setErrorMessage("Erro ao buscar os dados.");
            }
        };

        fetchData();
    }, []);

    const handleSelectUser = (id: number) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((userId) => userId !== id)
                : [...prevSelected, id]
        );
    };

    const handleSelectAll = () => {
        const allIds = users.map((u) => u.id);
        if (selectedUsers.length === allIds.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(allIds);
        }
    };

    const handleDeleteUsers = async () => {
        if (!window.confirm("Tem certeza de que deseja excluir os itens selecionados?")) return;

        try {
            await Promise.all(
                selectedUsers.map(async (id) => {
                    const user = users.find((u) => u.id === id);
                    if (user?.group === "Admin") {
                        await axios.delete(`http://localhost:8000/users/${id}/`);
                    } else if (user?.group === "Aluno") {
                        await axios.delete(`http://localhost:8000/alunos/${id}/`);
                    } else if (user?.group === "Professor") {
                        await axios.delete(`http://localhost:8000/professores/${id}/`);
                    }
                })
            );

            setUsers(users.filter((user) => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
        } catch (error) {
            setErrorMessage("Erro ao excluir os itens selecionados.");
        }
    };

    const handleEditUser = (id: number, group: string) => {
        if (group === "Admin") {
            window.location.href = `/Gerenciamento/EditarUsuario/${id}`;
        } else if (group === "Professor") {
            window.location.href = `/Gerenciamento/EditarProfessor/${id}`;
        } else if (group === "Aluno") {
            window.location.href = `/Gerenciamento/EditarAluno/${id}`;
        }
    };

    const handleAddUser = (type: string) => {
        if (type === "user") {
            window.location.href = "/PainelTutor/AdicionarUsuario";
        } else if (type === "student") {
            window.location.href = "/PainelTutor/AdicionarAluno";
        } else if (type === "professor") {
            window.location.href = "/PainelTutor/AdicionarProfessor";
        }
    };

    return (
        <ContainerPrincipal>
            <ContainerContent>
                <div className="p-4 text-white">
                    <h1 className="text-2xl font-bold mb-4">Gerenciar Usuários, Alunos e Professores</h1>

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    <div className="flex justify-end mb-4 gap-4">
                        <button
                            onClick={handleDeleteUsers}
                            disabled={selectedUsers.length === 0}
                            className={`p-2 bg-red-500 text-white rounded ${
                                selectedUsers.length === 0 && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Excluir Selecionados
                        </button>
                        <button
                            onClick={() => handleAddUser("user")}
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Adicionar Usuário
                        </button>
                        <button
                            onClick={() => handleAddUser("student")}
                            className="p-2 bg-green-500 text-white rounded"
                        >
                            Adicionar Aluno
                        </button>
                        <button
                            onClick={() => handleAddUser("professor")}
                            className="p-2 bg-yellow-500 text-white rounded"
                        >
                            Adicionar Professor
                        </button>
                    </div>

                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="font-extrabold">
                                <th className="border border-gray-300 p-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === users.length && users.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Nome</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Grupo</th>
                                <th className="border border-gray-300 p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 p-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleSelectUser(user.id)}
                                        />
                                    </td>
                                    <td className="border border-gray-300 p-2">{user.id}</td>
                                    <td className="border border-gray-300 p-2">{user.name || user.nome}</td>
                                    <td className="border border-gray-300 p-2">{user.email || "-"}</td>
                                    <td className="border border-gray-300 p-2">
                                        {user.group || "Sem Grupo"}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                        <button
                                            onClick={() => handleEditUser(user.id, user.group)}
                                            className="p-2 bg-blue-500 text-white rounded"
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

export default UserManagementPage;
