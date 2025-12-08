import { useState, useEffect, useRef } from "react"
import { URL_API } from "../../files-access/access"
// Componentes
import Card from "./modules/card-profesionales"
import Encab from "./container-encab"
import TurnoProximo from "../logica-profesionales/container-info"
import CrearTurno from "./modules/CrearTurno"

// Borramos: import "./styles/dashboard-clientes.css"
// Borramos: import gif from "../load.gif" (Usaremos un spinner CSS)

function Cliente({ state }) {
    const crearTurnoRef = useRef(null)

    const [persona, setPersona] = useState({})
    const [profesionales, setProfesionales] = useState([])
    const [proximoTurno, setProximoTurno] = useState(null)
    const [nombre, setNombre] = useState("")
    const [busqueda, setBusqueda] = useState("")
    const [filtros, setFiltros] = useState([])
    const [loading, setLoading] = useState(true)
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null)

    useEffect(() => {
        // En lugar de document.body.style, usamos clases en el contenedor principal
        
        Promise.all([
            fetch(`${URL_API}/usuarios/${state.type}/${state.id}`).then(res => res.json()),
            fetch(`${URL_API}/usuarios/profesionales`).then(res => res.json()),
            fetch(`${URL_API}/turnos/?id_cliente=${state.id}`).then(res => res.json())
        ])
            .then(([personaData, profesionalesData, turnosData]) => {
                setPersona(personaData)
                setProfesionales(profesionalesData)

                const ahora = new Date()
                const turnosHoy = turnosData
                    .filter(t => {
                        const date = new Date(t.hora_inicio)
                        return (
                            date.getDate() === ahora.getDate() &&
                            date.getMonth() === ahora.getMonth() &&
                            date.getFullYear() === ahora.getFullYear() &&
                            date >= ahora
                        )
                    })
                    .sort((a, b) => new Date(a.hora_inicio) - new Date(b.hora_inicio))

                const proximo = turnosHoy[0] || null
                setProximoTurno(proximo)

                if (proximo) {
                    const profesional = profesionalesData.find(p => p.id === proximo.id_profesional)
                    setNombre(profesional ? profesional.nombre_completo : "")
                } else {
                    setNombre("")
                }
            })
            .catch(err => console.error("Error al obtener datos:", err))
            .finally(() => setLoading(false))
    }, [state])

    // Filtrado
    useEffect(() => {
        if(profesionales.length > 0) {
            const profesionalesFiltrados = profesionales.filter(p =>
                p.nombre_completo.toLowerCase().includes(busqueda.toLowerCase())
            )
            setFiltros(profesionalesFiltrados)
        }
    }, [busqueda, profesionales])

    // Scroll automático al seleccionar
    useEffect(() => {
        if (profesionalSeleccionado && crearTurnoRef.current) {
            // Pequeño timeout para dar tiempo a que se renderice el div
            setTimeout(() => {
                 crearTurnoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
            }, 100)
        }
    }, [profesionalSeleccionado])


    // --- RENDER DE CARGA ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                {/* Spinner con Tailwind */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-ui-600"></div>
                <p className="text-gray-500 font-medium animate-pulse">Cargando dashboard...</p>
            </div>
        )
    }

    // --- RENDER PRINCIPAL ---
    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            
            <Encab nombre={persona.nombre_completo} />

            <div className="max-w-6xl mx-auto px-6 space-y-10">
                
                {/* SECCIÓN: PRÓXIMO TURNO */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                     <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Tu agenda para hoy</h3>
                    {proximoTurno ? (
                        <TurnoProximo
                            hora={`${new Date(proximoTurno.hora_inicio).getHours()}:${new Date(proximoTurno.hora_inicio)
                                .getMinutes()
                                .toString()
                                .padStart(2, "0")}`}
                            nombre={nombre}
                        />
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                             <p>No tienes turnos programados para el resto del día 🎉</p>
                        </div>
                    )}
                </div>

                {/* SECCIÓN: BUSCADOR Y LISTA */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-ui-800">Directorio de Profesionales</h1>
                        
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={busqueda}
                                onChange={e => setBusqueda(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-ui-500 outline-none shadow-sm"
                            />
                            {/* Icono de lupa svg */}
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                    </div>

                    {/* GRID DE PROFESIONALES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtros.length > 0 ? (
                            filtros.map((profesional, i) => (
                                <Card
                                    key={i}
                                    nombre={profesional.nombre_completo}
                                    edad={profesional.edad}
                                    especialidad={profesional.especialidad}
                                    onClick={() => setProfesionalSeleccionado(profesional)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 bg-white rounded-xl text-gray-500">
                                <p>No encontramos profesionales con ese nombre.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* SECCIÓN: CREAR TURNO (Scroll Target) */}
                <div ref={crearTurnoRef}>
                    {profesionalSeleccionado && (
                        <CrearTurno
                            idCliente={state.id}
                            idProfesional={profesionalSeleccionado.id}
                            nombre_profesional={profesionalSeleccionado.nombre_completo}
                            onTurnoCreado={(nuevoTurno) => {
                                console.log("Turno creado:", nuevoTurno)
                                // Opcional: Podrías recargar los turnos aquí si quisieras
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cliente