import Turno from "./modules/turno"
// Borramos: import "./styles/turnos.css"

// Función auxiliar para formatear hora (HH:MM)
const formatTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

function Turnos({ turnos, clientes }) {
    
    if (!turnos || turnos.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-10 text-center text-gray-400">
                <p>No hay turnos para mostrar en la lista.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-6 pb-20">
            <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-ui-600 rounded-full"></span>
                Cronograma del día
            </h3>
            
            {/* Grid layout: 1 columna en móvil, 2 columnas en pantallas medianas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {turnos.map((turno, index) => {
                    // Buscamos el cliente de forma segura (con ?)
                    const clienteNombre = clientes.find(c => c.id === turno.id_cliente)?.nombre_completo || "Cliente Desconocido";
                    
                    return (
                        <Turno
                            key={index}
                            titulo={turno.titulo}
                            hora_inicio={formatTime(turno.hora_inicio)}
                            hora_fin={formatTime(turno.hora_fin)}
                            cliente={clienteNombre}
                            descripcion={turno.descripcion}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default Turnos