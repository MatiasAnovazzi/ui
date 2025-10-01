import { useEffect, useState } from "react"
import { URL_API } from "../../files-access/access"
import SupContainer from "./sup-container"
import TurnoProximo from "./container-info"
import "./styles/dashboard-profesional.css"
import Turnos from "./turnos"
import gif from "../load.gif"
function Profesional({ state }) {
  const [profesional, setProfesional] = useState({})
  const [turnos, setTurnos] = useState([])
  const [clientes, setClientes] = useState([])
  const [nombre_cliente, setNombreCliente] = useState("")
  const [hora_proximo_turno, setHoraProximoTurno] = useState(null)
  const [turnos_hoy, setTurnosHoy] = useState([])
  const [loading, setLoading] = useState(true) // 👈 nuevo estado

  useEffect(() => {
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
        setLoading(false) // 👈 cuando termina todo
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

  // 🔒 Control de carga
  if (loading) {
  return (
    <div className="loading-container">
      <img src={gif} alt="Cargando..." className="loading-gif" />
      <p>Cargando datos...</p>
    </div>
  )
}


  return (
    <div id="render-pro">
      <SupContainer
        nombre={profesional.nombre_completo}
        total_turnos={turnos_hoy.length}
      />

      {hora_proximo_turno ? (
        <TurnoProximo
          hora={`${hora_proximo_turno.getHours()}:${hora_proximo_turno
            .getMinutes()
            .toString()
            .padStart(2, "0")}`}
          nombre={nombre_cliente}
        />
      ) : (
        <TurnoProximo/>
      )}

      <Turnos turnos={turnos_hoy} clientes={clientes} />
    </div>
  )
}

export default Profesional
