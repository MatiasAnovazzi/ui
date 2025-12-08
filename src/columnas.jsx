function Columnas() {
  return (
    <div id="columnas" className="py-20 bg-gray-50">
      
      {/* Título Principal de la Sección */}
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-bold text-ui-800">
          ¿Cómo se usa?
        </h3>
        
      </div>

      {/* Contenedor Grid: 1 columna en móvil, 2 en PC */}
      <div id="contenedor" className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* TARJETA IZQUIERDA: CLIENTES */}
        <div id="left" className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-ui-500 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-ui-800 mb-6 border-b pb-2">
            Clientes
          </h2>
          <ul className="space-y-4 text-gray-600">
            {/* Usamos 'flex' en el LI para alinear el icono/emoji con el texto */}
            <li className="flex items-start gap-3">
              <span className="text-ui-500 text-xl">📝</span>
              <span>Te registras como cliente.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ui-500 text-xl">🔍</span>
              <span>Buscas el profesional de tu elección.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ui-500 text-xl">📅</span>
              <span>Luego de observar la disponibilidad, seleccionas el horario y agendas.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ui-500 text-xl">✅</span>
              <span>¡Y listo! La app te recuerda tu turno mediante <strong>WhatsApp</strong>.</span>
            </li>
          </ul>
        </div>

        {/* TARJETA DERECHA: PROFESIONALES */}
        <div id="right" className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-ui-800 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-bold text-ui-800 mb-6 border-b pb-2">
            Profesionales
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-ui-800 text-xl">💼</span>
              <span>Te registras como profesional.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ui-800 text-xl">⚙️</span>
              <span>Cargas tu actividad y disponibilidad horaria.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ui-800 text-xl">👀</span>
              <span>¡Y listo! Cuando un cliente cargue un turno, puedes visualizarlo en tu panel.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
export default Columnas
