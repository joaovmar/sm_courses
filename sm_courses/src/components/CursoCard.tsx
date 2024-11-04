export function CursoCard() {
    return (
        <div className="flex flex-col gap-4 pb-4 w-1/4 border border-slate-950 rounded shadow-2xl hover:animate-pulse">
            <img src="./src/assets/images/sm-courses_background.svg" alt="" srcset="" />
            <div className="mx-4">
                <h1 className="col-span-2 text-2xl text-white mb-1">React with Typescript</h1>
                <div className="flex justify-between text-gray-400 text-sm">
                    <p><strong>Professor:</strong> Raul Gustavo</p>
                    <p>Duração: 4 horas</p>
                </div>
            </div>

        </div>
    )
}