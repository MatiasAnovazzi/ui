// Borramos: import "./styles/container-encab.css"

function Encab({ nombre }) {
    return (
        <div className="bg-ui-600 py-8 px-6 shadow-md mb-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Hola, <span className="text-ui-100">{nombre}</span>!
                </h1>
                <p className="text-ui-100 mt-1 text-lg opacity-90">
                    ¿Qué buscas hoy?
                </p>
            </div>
        </div>
    );
}

export default Encab;