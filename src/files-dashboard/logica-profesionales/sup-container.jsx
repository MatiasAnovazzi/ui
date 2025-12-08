// Borramos: import "./styles/sup-container.css"

function SupContainer({ nombre, total_turnos }) {
  let mensaje = "";
  let submensaje = "";

  if (total_turnos === 0) {
    mensaje = "Todo despejado";
    submensaje = "No tienes turnos programados para hoy. ¡Disfruta tu día!";
  } else if (total_turnos === 1) {
    mensaje = "Día tranquilo";
    submensaje = "Tienes solo 1 turno programado hoy.";
  } else {
    mensaje = "Agenda activa";
    submensaje = `Hoy tienes un total de ${total_turnos} turnos. ¡A trabajar!`;
  }

  return (
    <div className="bg-ui-800 text-white py-10 px-6 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          Hola, <span className="text-ui-200">{nombre}</span>
        </h1>
        <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
            <h4 className="text-xl font-semibold text-ui-100">{mensaje}</h4>
            <p className="text-gray-200">{submensaje}</p>
        </div>
      </div>
    </div>
  )
}

export default SupContainer