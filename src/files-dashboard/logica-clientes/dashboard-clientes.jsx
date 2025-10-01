import { useState, useEffect } from "react"
import Card from "./modules/card-profesionales"
import { URL_API } from "../../files-access/access"
import Encab from "./container-encab"
import TurnoProximo from "../logica-profesionales/container-info"
import "./styles/dashboard-clientes.css"
import gif from "../load.gif"
import CrearTurno from "./modules/CrearTurno"
function Cliente({ state }) {
    const [persona, setPersona] = useState({})
    const [profesionales, setProfesionales] = useState([])
    const [proximoTurno, setProximoTurno] = useState(null)
    const [nombre, setNombre] = useState("")
    const [busqueda, setBusqueda] = useState("")
    const [filtros, setFiltros] = useState([])
    const [loading, setLoading] = useState(true) // <-- estado de carga
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null)
    useEffect(() => {
        document.body.style.backgroundColor = "white"

        // Hacemos todos los fetch en paralelo con Promise.all
        Promise.all([
            fetch(`${URL_API}/usuarios/${state.type}/${state.id}`).then(res => res.json()),
            fetch(`${URL_API}/usuarios/profesionales/`).then(res => res.json()),
            fetch(`${URL_API}/turnos/?id_cliente=${state.id}`).then(res => res.json())
        ])
            .then(([personaData, profesionalesData, turnosData]) => {
                setPersona(personaData)
                setProfesionales(profesionalesData)

                // Filtrar turnos de hoy
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
            .finally(() => setLoading(false)) // <-- termina la carga
    }, [state])

    // Filtrado por búsqueda
    useEffect(() => {
        const profesionalesFiltrados = profesionales.filter(p =>
            p.nombre_completo.toLowerCase().includes(busqueda.toLowerCase())
        )
        setFiltros(profesionalesFiltrados)
    }, [busqueda, profesionales, profesionalSeleccionado])

    if (loading) {
        return (
            <div className="loading-container">
                <img src={gif} alt="Cargando..." className="loading-gif" />
                <p>Cargando datos...</p>
            </div>
        )
    }


    return (
        <>
            <Encab nombre={persona.nombre_completo} />

            {proximoTurno ? (
                <TurnoProximo
                    hora={`${new Date(proximoTurno.hora_inicio).getHours()}:${new Date(proximoTurno.hora_inicio)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}
                    nombre={nombre}
                />
            ) : (
                <TurnoProximo />
            )}

            <h1>LISTA DE PROFESIONALES</h1>
            <div className="search-container">
                <label htmlFor="buscar">Buscar profesional:</label>
                <input
                    type="text"
                    id="buscar"
                    placeholder="Nombre del profesional"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>


            <div className="grid-container">
                {filtros.length > 0 ? (
                    filtros.map((e, i) => (
                        <Card
                            key={i}
                            nombre={e.nombre_completo}
                            edad={e.edad}
                            especialidad={e.especialidad}
                            onClick={() => setProfesionalSeleccionado(e)}
                        />
                    ))
                ) : (
                    <p>No se encontró ningún profesional</p>
                )}
            </div>

            {/* Mostrar CrearTurno solo si se seleccionó un profesional */}
            {profesionalSeleccionado && (
                <CrearTurno
                    idCliente={state.id}
                    idProfesional={profesionalSeleccionado.id}
                    nombre_profesional={profesionalSeleccionado.nombre_completo}
                    onTurnoCreado={(nuevoTurno) => console.log("Turno creado:", nuevoTurno)}
                />
            )}
        </>
    )
}

export default Cliente
