import "./styles/sup-container.css"

function SupContainer({ nombre, total_turnos }) {
  let contador = ""

  if (total_turnos === 0) {
    contador = "Para hoy no tienes turnos programados"
  } else if (total_turnos === 1) {
    contador = `Para hoy tienes ${total_turnos} turno programado`
  } else if (total_turnos > 1) {
    contador = `Para hoy tienes un total de ${total_turnos} turnos programados. ¡Muy bien!`
  }

  return (
    <div id="container-encab" >
      <h1>Hola {nombre}! Esta es tu agenda... </h1> 
      <h4>{contador}</h4>
    </div>
  )
}

export default SupContainer
