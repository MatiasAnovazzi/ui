import { useState } from "react";
import { URL_API } from "./access";
import { useNavigate, Link } from "react-router-dom";

// Asegúrate de borrar la importación de "./styles/login.css"

function Login() {
    const navigate = useNavigate();

    // Estados
    const [dni, setDni] = useState("");
    const [type, setType] = useState("clientes");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(""); // Estado para manejar errores visualmente

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos
        setIsLoading(true);

        // 1. Validación Básica
        if (!dni || isNaN(Number(dni)) || dni.length < 7) {
            setError("Por favor, ingresa un DNI válido.");
            setIsLoading(false);
            return;
        }

        try {
            // 2. Petición a la API
            const response = await fetch(`${URL_API}/usuarios/${type}`);
            
            if (!response.ok) {
                throw new Error("Error al conectar con el servidor.");
            }

            const users = await response.json();

            // 3. Búsqueda optimizada con .find()
            // Buscamos el usuario cuyo dni coincida con el input
            // Nota: Aseguramos que ambos sean String o Number para comparar
            const userFound = users.find(u => String(u.dni) === String(dni));

            if (userFound) {
                // 4. Redirección exitosa
                navigate("/dashboard", {
                    state: {
                        id: userFound.id,
                        type: type,
                        name: userFound.nombre_completo // Opcional: útil para saludar en el dashboard
                    }
                });
            } else {
                setError("Usuario no encontrado. Verifica el DNI o el tipo de cuenta.");
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError("Ocurrió un error de conexión. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            
            <div className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                
                {/* Encabezado */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-ui-800">Bienvenido</h1>
                    <p className="text-gray-500 text-sm">Ingresa a CliProApp</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Input DNI */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Documento de Identidad
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: 12345678"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none transition-all"
                        />
                    </div>

                    {/* Select Tipo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Usuario
                        </label>
                        <div className="relative">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none bg-white appearance-none cursor-pointer"
                            >
                                <option value="clientes">Cliente</option>
                                <option value="profesionales">Profesional</option>
                            </select>
                            {/* Flecha decorativa para el select */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/* Mensaje de Error (renderizado condicional) */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-pulse">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {error}
                        </div>
                    )}

                    {/* Botón Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`
                            w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white 
                            transition-colors focus:outline-none
                            ${isLoading ? 'bg-ui-400 cursor-wait' : 'bg-ui-600 hover:bg-ui-800'}
                        `}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                {/* Pequeño spinner SVG */}
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Verificando...
                            </span>
                        ) : "Acceder"}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="font-medium text-ui-600 hover:text-ui-500 hover:underline">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;