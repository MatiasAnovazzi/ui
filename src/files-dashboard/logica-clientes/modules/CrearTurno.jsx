import { useState } from "react"
import { URL_API } from "../../../files-access/access"
import "./styles/crearturno.css"
export default function CrearTurno({ idCliente, idProfesional, onTurnoCreado, nombre_profesional }) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [horaInicio, setHoraInicio] = useState("")
  const [horaFin, setHoraFin] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${URL_API}/turnos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          id_cliente: idCliente,
          id_profesional: idProfesional
        })
      })

      if (!response.ok){
        throw new Error("Error al crear el turno")
      } 

      const data = await response.json()
      onTurnoCreado(data) // callback para actualizar la lista de turnos en el padre

      // Limpiar formulario
      setTitulo("")
      setDescripcion("")
      setHoraInicio("")
      setHoraFin("")
      setError("Turno creado")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="crear-turno-container">
      <h2>Crear Turno con {nombre_profesional} </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Hora de inicio"
          value={horaInicio}
          onChange={e => setHoraInicio(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Hora de fin"
          value={horaFin}
          onChange={e => setHoraFin(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          <p>{loading ? "Creando..." : "Crear Turno"}</p>
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
