interface CursoCardProps {
    nome: string;
    descricao: string;
    professor: string;
    onEdit?: () => void;  // Função opcional para edição
    onDelete?: () => void; // Função opcional para exclusão
}

export function CursoCard({ nome, descricao, professor, onEdit, onDelete }: CursoCardProps) {
    return (
        <div className="flex flex-col gap-4 pb-4 w-1/4 border border-slate-950 rounded shadow-2xl hover:animate-pulse">
            <img src="./src/assets/images/sm-courses_background.svg" alt="Curso Background" />
            <div className="mx-4">
                <h1 className="col-span-2 text-2xl text-white mb-1">{nome}</h1>
                <p className="text-gray-400 mb-2">{descricao}</p>
                <div className="flex justify-between text-gray-400 text-sm">
                    <p><strong>Professor:</strong> {professor}</p>
                </div>
                {onEdit && onDelete && (
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            onClick={onEdit}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Editar
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Excluir
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
