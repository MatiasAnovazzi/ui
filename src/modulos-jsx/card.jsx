function Card({ pic, titulo, desc }) {
    return (
        <div className="
            flex flex-col items-center text-center 
            bg-white p-6 rounded-xl shadow-md border border-gray-100
            hover:shadow-xl hover:-translate-y-1 hover:border-ui-200
            transition-all duration-300 ease-in-out
            h-full
        ">
            {/* Contenedor de la imagen con tamaño fijo para uniformidad */}
            <div className="mb-4 p-3 bg-ui-50 rounded-full">
                <img 
                    className="w-12 h-12 object-contain" 
                    src={pic} 
                    alt={titulo} 
                />
            </div>

            <div className="space-y-2">
                {/* Título: Usamos tus colores UI */}
                <h3 className="text-lg font-bold text-ui-800">
                    {titulo}
                </h3>
                
                {/* Descripción: Gris suave para no competir con el título */}
                <p className="text-sm text-gray-500 leading-relaxed ">
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default Card