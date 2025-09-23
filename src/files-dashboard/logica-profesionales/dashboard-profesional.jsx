import { useEffect, useState } from "react"
import { URL_API } from "../../files-access/access"
import SupContainer from "./sup-container"
import TurnoProximo from "./container-info"
import "./styles/dashboard-profesional.css"

function Profesional({state}){
    /*
    variable profesional guarda datos del profesional logueado ej: nombre, especialidad
    variable turnos guarda, despues de hacer peticion HTTP, TODOS los turnos del profesional, posee datos del turno como titulo, hora_inicio, etc
    variable clientes guarda lista de clientes, con datos como nombre_completo, edad, id, etc
    variable nombre_cliente guarda el nombre del cliente que coincide con el id del cliente del turno
    variable hora_proximo_turno guarda la hora de inicio en formato datetime, listo para usar con metodos del objeto Date()
    */
   const [profesional, setProfesional] = useState({})
   const [turnos, setTurnos ] = useState([])
   const [clientes, setClientes] = useState([])
   const [nombre_cliente, setNombreCliente] = useState("")
   const [hora_proximo_turno, setHoraProximoTurno] = useState(new Date());
   const [turnos_hoy, setTurnosHoy] = useState([])
   useEffect(() => {
    // obtener datos del profesional
        fetch(`${URL_API}/usuarios/${state.type}/${state.id}`)
            .then(response => response.json())
            .then(data => {
                setProfesional(data)
            })
    // obtener turnos del profesional
        fetch(`${URL_API}/turnos/?id_profesional=${state.id}`)
            .then(response => response.json())
            .then(data => {
                setTurnos(data)
            })
    // obtener lista de clientes
        fetch(`${URL_API}/usuarios/clientes`)
            .then(response => response.json())
            .then(data => {
                setClientes(data)
            })
    }, [state.id])

    useEffect(() => {
  if (turnos.length === 0) return;

  let fecha_actual = new Date();

  // filtrar todos los turnos de hoy
  let hoy = turnos.filter(turno => {
    let date = new Date(turno.hora_inicio);
    return (
      date.getDate() === fecha_actual.getDate() &&
      date.getMonth() === fecha_actual.getMonth() &&
      date.getFullYear() === fecha_actual.getFullYear()
    );
  }).sort((a,b) => new Date(a.hora_inicio) - new Date (b.hora_inicio));

  setTurnosHoy(hoy);

  // si hay turnos hoy, buscamos el más próximo
  if (hoy.length > 0) {
    let proximo_turno = hoy[0]
    // Verificar si el turno ya pasó
    const ahora = new Date();
    let idx = 0;
    while (
      idx < hoy.length &&
      new Date(hoy[idx].hora_inicio) <= ahora
    ) {
      idx++;
    }
    // Si hay un turno próximo, usarlo; si no, vaciar proximo_turno
    if (idx < hoy.length) {
      proximo_turno = hoy[idx];
    } else {
      proximo_turno = null;
    }
    if(proximo_turno){
        setHoraProximoTurno(new Date(proximo_turno.hora_inicio));
        let cliente = clientes.find(c => c.id === proximo_turno.id_cliente);
        if (cliente) {
        setNombreCliente(cliente.nombre_completo);
    }
    }

    // buscar nombre del cliente
    
  }
}, [turnos, clientes]);

    return (
        <div id="render-pro" >
        <SupContainer nombre={profesional.nombre_completo} total_turnos={turnos_hoy.length}/>
        <TurnoProximo 
        hora={`${hora_proximo_turno.getHours()}:${hora_proximo_turno.getMinutes() <= 9 ? `0${hora_proximo_turno.getMinutes()}`:`${hora_proximo_turno.getMinutes()}`}`} 
        nombre_cliente={nombre_cliente} />
        </div>
    )
}
export default Profesional