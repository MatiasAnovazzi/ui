import { useEffect, useState } from "react"
import { URL_API } from "../../files-access/access"

// Componentes
import SupContainer from "./sup-container"
import TurnoProximo from "./container-info"
import Turnos from "./turnos"

// Borramos: import "./styles/dashboard-profesional.css"
// Borramos: import gif from "../load.gif"

function Profesional({ state }) {
  const [profesional, setProfesional] = useState({})
  const [turnos, setTurnos] = useState([])
  const [clientes, setClientes] = useState([])
  const [nombre_cliente, setNombreCliente] = useState("")
  const [hora_proximo_turno, setHoraProximoTurno] = useState(null)
  const [turnos_hoy, setTurnosHoy] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Estilo global del body manejado via Tailwind clases en el contenedor, 
    // pero si necesitas forzar el blanco al montar:
    // document.body.style.backgroundColor = "#f9fafb"; // gris muy claro (gray-50)

    const fetchData = async () => {
      try {
        const [profRes, turnosRes, clientesRes] = await Promise.all([
          fetch(`${URL_API}/usuarios/${state.type}/${state.id}`),
          fetch(`${URL_API}/turnos/?id_profesional=${state.id}`),
          fetch(`${URL_API}/usuarios/clientes`),
        ])

        const [profData, turnosData, clientesData] = await Promise.all([
          profRes.json(),
          turnosRes.json(),
          clientesRes.json(),
        ])

        setProfesional(profData)
        setTurnos(turnosData)
        setClientes(clientesData)
      } catch (err) {
        console.error("Error cargando datos:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [state.id, state.type])

  useEffect(() => {
    if (turnos.length === 0) return

    const fecha_actual = new Date()

    const hoy = turnos
      .filter(t => {
        const date = new Date(t.hora_inicio)
        return (
          date.getDate() === fecha_actual.getDate() &&
          date.getMonth() === fecha_actual.getMonth() &&
          date.getFullYear() === fecha_actual.getFullYear()
        )
      })
      .sort((a, b) => new Date(a.hora_inicio) - new Date(b.hora_inicio))

    setTurnosHoy(hoy)

    if (hoy.length > 0) {
      const ahora = new Date()
      let idx = 0
      while (idx < hoy.length && new Date(hoy[idx].hora_inicio) <= ahora) {
        idx++
      }

      if (idx < hoy.length) {
        const proximo_turno = hoy[idx]
        setHoraProximoTurno(new Date(proximo_turno.hora_inicio))

        const cliente = clientes.find(c => c.id === proximo_turno.id_cliente)
        setNombreCliente(cliente ? cliente.nombre_completo : "")
      } else {
        setHoraProximoTurno(null)
        setNombreCliente("")
      }
    } else {
      setHoraProximoTurno(null)
      setNombreCliente("")
    }
  }, [turnos, clientes])

  // --- Renderizado de Carga ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 font-sans">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-ui-600"></div>
         <p className="text-gray-500 font-medium animate-pulse">Cargando agenda...</p>
      </div>
    )
  }

  // --- Renderizado Principal ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      <SupContainer
        nombre={profesional.nombre_completo}
        total_turnos={turnos_hoy.length}
      />

      {hora_proximo_turno ? (
        <TurnoProximo
          hora={`${hora_proximo_turno.getHours().toString().padStart(2, '0')}:${hora_proximo_turno
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}
          nombre={nombre_cliente}
        />
      ) : (
        <TurnoProximo />
      )}

      <Turnos turnos={turnos_hoy} clientes={clientes} />
      
    </div>
  )
}

export default Profesional