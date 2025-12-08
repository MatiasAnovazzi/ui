// Borramos: import "./styles/turno.css"

function Turno({ titulo, hora_inicio, hora_fin, cliente, descripcion }) {
    return (
        <div className="group bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex gap-4 items-start">
            
            {/* Columna Izquierda: Hora */}
            <div className="flex flex-col items-center justify-center min-w-[80px] bg-ui-50 rounded-lg py-2 text-ui-800 font-mono">
                <span className="font-bold text-lg">{hora_inicio}</span>
                <span className="text-xs text-gray-400">hasta</span>
                <span className="text-sm text-gray-500">{hora_fin}</span>
            </div>

            {/* Columna Derecha: Info */}
            <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800 group-hover:text-ui-600 transition-colors">
                    {titulo}
                </h4>
                
                <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        Cliente
                    </span>
                    <p className="text-gray-700 font-medium">{cliente}</p>
                </div>

                {descripcion && (
                    <p className="text-sm text-gray-500 italic bg-gray-50 p-2 rounded border-l-2 border-gray-300">
                        "{descripcion}"
                    </p>
                )}
            </div>
        </div>
    )
}

export default Turno