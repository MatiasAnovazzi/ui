import { useState } from "react"
import { URL_API } from "../../../files-access/access"
// Borramos: import "./styles/crearturno.css"

export default function CrearTurno({ idCliente, idProfesional, onTurnoCreado, nombre_profesional }) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [horaInicio, setHoraInicio] = useState("")
  const [horaFin, setHoraFin] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch(`${URL_API}/turnos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          hora_inicio: horaInicio,
          hora_fin: horaFin,
          id_cliente: idCliente,
          id_profesional: idProfesional
        })
      })

      if (!response.ok) throw new Error("Error al crear el turno")

      const data = await response.json()
      onTurnoCreado(data)
      
      // Limpiar y mostrar éxito
      setTitulo("")
      setDescripcion("")
      setHoraInicio("")
      setHoraFin("")
      setSuccess(true)
      
      // Ocultar mensaje de éxito después de 3 seg
      setTimeout(() => setSuccess(false), 3000)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-ui-600 mt-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📅 Agendar con <span className="text-ui-600">{nombre_profesional}</span>
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Título */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Motivo del turno</label>
            <input
              type="text"
              placeholder="Ej: Consulta general"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none"
            />
        </div>

        {/* Descripción */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detalles (Opcional)</label>
            <textarea
              placeholder="Describe brevemente..."
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none resize-none h-24"
            />
        </div>

        {/* Fechas (Grid 2 columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                <input
                  type="datetime-local"
                  value={horaInicio}
                  onChange={e => setHoraInicio(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none text-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                <input
                  type="datetime-local"
                  value={horaFin}
                  onChange={e => setHoraFin(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ui-500 outline-none text-gray-600"
                />
            </div>
        </div>

        {/* Mensajes de Estado */}
        {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded">{error}</p>}
        {success && <p className="text-green-600 text-sm font-bold bg-green-50 p-2 rounded">¡Turno creado exitosamente!</p>}

        {/* Botón */}
        <button 
            type="submit" 
            disabled={loading}
            className={`
                w-full py-3 px-4 rounded-lg text-white font-bold transition-all
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-ui-600 hover:bg-ui-800 shadow-lg hover:shadow-xl'}
            `}
        >
          {loading ? "Procesando..." : "Confirmar Turno"}
        </button>
      </form>
    </div>
  )
}