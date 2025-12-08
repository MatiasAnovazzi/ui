import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Ya no necesitamos importar css externo
// import "./styles/formulario.css" 

function Formulario() {
    const URLP = "https://api-cliproapp.up.railway.app/docs";
    const URL_BASE = "https://api-cliproapp.up.railway.app/";

    // Estados de UI
    const [apiStatus, setApiStatus] = useState("checking"); // checking, success, error
    const [buttonText, setButtonText] = useState("Registrarse");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados del Formulario
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [edad, setEdad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [seleccion, setSeleccion] = useState("cliente");
    const [especialidad, setEspecialidad] = useState("");

    // 1. Probar conexión al montar
    useEffect(() => {
        fetch(URLP)
            .then(response => {
                if (response.ok) {
                    setApiStatus("success");
                } else {
                    setApiStatus("error");
                }
            })
            .catch(() => setApiStatus("error"));
    }, []);

    // 2. Función de envío refactorizada
    async function enviar() {
        if (!nombre || !dni || !telefono) {
            alert("Por favor completa los campos obligatorios");
            return;
        }

        setIsSubmitting(true);
        setButtonText("Registrando...");

        const endpoint = seleccion === "cliente" 
            ? "usuarios/clientes" 
            : "usuarios/profesionales";

        const baseData = {
            nombre_completo: nombre,
            dni,
            edad: Number(edad),
            telefono
        };

        // Si es profesional, agregamos la especialidad al objeto
        const payload = seleccion === "profesional" 
            ? { ...baseData, especialidad } 
            : baseData;

        try {
            const response = await fetch(URL_BASE + endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data) {
                setButtonText("¡Registro Exitoso!");
                console.log("Respuesta servidor:", data);
                // Opcional: Redirigir o limpiar formulario aquí
            }
        } catch (error) {
            console.error("Error al registrar:", error);
            setButtonText("Error, intenta de nuevo");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100 relative">
                
                {/* Indicador de Estado de la API (Badge) */}
                <div className="absolute top-4 right-4">
                    {apiStatus === "checking" && <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Conectando...</span>}
                    {apiStatus === "success" && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">● Sistema Online</span>}
                    {apiStatus === "error" && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">● Sin Conexión</span>}
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-ui-800">Crea tu cuenta</h2>
                    <p className="mt-2 text-sm text-gray-600">Únete a CliProApp</p>
                </div>

                <div className="space-y-5">
                    
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                        <input 
                            type="text" value={nombre} onChange={e => setNombre(e.target.value)} 
                            placeholder="Ingresa un nombre"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none"
                        />
                    </div>

                    {/* DNI y Edad */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">DNI:</label>
                            <input 
                                type="text" value={dni} onChange={e => setDni(e.target.value)} 
                                placeholder="DNI"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Edad:</label>
                            <input 
                                type="number" value={edad} onChange={e => setEdad(e.target.value)} 
                                placeholder="Edad"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono:</label>
                        <input 
                            type="text" value={telefono} onChange={e => setTelefono(e.target.value)} 
                            placeholder="Ingresa tu teléfono"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none"
                        />
                    </div>

                    {/* Selector Cliente/Profesional */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Soy:</label>
                        <select 
                            value={seleccion} 
                            onChange={(e) => setSeleccion(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none bg-white"
                        >
                            <option value="cliente">Cliente</option>
                            <option value="profesional">Profesional</option>
                        </select>
                    </div>

                    {/* Especialidad (Renderizado Condicional) */}
                    {/* Usamos lógica simple: Si es profesional, se muestra. Si no, null */}
                    {seleccion === "profesional" && (
                        <div className="animate-fade-in-down">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad:</label>
                            <input 
                                type="text" value={especialidad} onChange={e => setEspecialidad(e.target.value)} 
                                placeholder="Ej: Mecánico, Abogado..."
                                className="w-full px-4 py-2 border border-ui-200 bg-ui-50 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none"
                            />
                        </div>
                    )}

                    {/* Botón de Enviar */}
                    <button 
                        onClick={enviar}
                        disabled={isSubmitting} // Evita doble click
                        className={`
                            w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white 
                            transition-colors focus:outline-none
                            ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-ui-600 hover:bg-ui-800'}
                        `}
                    >
                        {buttonText}
                    </button>

                </div>

                {/* Footer Links */}
                <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-2">
                        ¿Ya tienes una cuenta? <Link to="/access" className="text-ui-600 hover:underline font-semibold">Iniciar sesión</Link>
                    </p>
                    <p className="text-sm">
                        <Link to="/" className="text-gray-400 hover:text-gray-600">Volver al inicio</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Formulario;