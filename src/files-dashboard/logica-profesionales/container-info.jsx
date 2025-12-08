// Borramos: import "./styles/container-info.css"

function TurnoProximo({ hora, nombre }) {
    const hayTurno = hora && nombre;

    return (
        <div className="max-w-4xl mx-auto px-6 -mt-6 mb-8 relative z-10">
            <div className={`
                p-6 rounded-xl shadow-md flex items-center gap-4 transition-all
                ${hayTurno ? 'bg-white border-l-8 border-ui-500' : 'bg-gray-100 border-l-8 border-gray-300'}
            `}>
                {hayTurno ? (
                    <>
                        <div className="bg-ui-100 p-3 rounded-full text-2xl">⏰</div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Próximo Turno</p>
                            <p className="text-lg font-medium text-gray-800">
                                A las <span className="text-ui-700 font-bold text-xl">{hora}</span> con {nombre}
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                         <div className="text-2xl grayscale opacity-50">☕</div>
                         <p className="text-gray-500 font-medium">No hay turnos próximos inmediatos.</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default TurnoProximo