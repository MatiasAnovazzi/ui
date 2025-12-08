// Borramos: import "./styles/card-profesionales.css"

function Card({ nombre, edad, especialidad, onClick }) {
    return (
        <div 
            onClick={onClick}
            className="
                bg-white p-6 rounded-xl shadow-sm border border-gray-100 
                cursor-pointer transition-all duration-300
                hover:shadow-lg hover:-translate-y-1 hover:border-ui-300
                flex flex-col gap-2
            "
        >
            <div className="flex items-center gap-3 mb-2">
                {/* Icono de avatar genérico */}
                <div className="w-10 h-10 rounded-full bg-ui-100 flex items-center justify-center text-ui-600 font-bold">
                    {nombre.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{nombre}</h2>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
                <p>
                    <strong className="text-ui-800">Especialidad:</strong> {especialidad}
                </p>
                <p>
                    <strong className="text-ui-800">Edad:</strong> {edad} años
                </p>
            </div>
            
            <div className="mt-3 text-ui-600 text-sm font-medium flex items-center gap-1">
                Ver disponibilidad <span>→</span>
            </div>
        </div>
    );
}

export default Card;