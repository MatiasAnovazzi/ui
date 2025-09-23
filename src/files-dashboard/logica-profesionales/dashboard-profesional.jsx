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
   useEffect(() => {
        fetch(`${URL_API}/usuarios/${state.type}/${state.id}`)
            .then(response => response.json())
            .then(data => {
                setProfesional(data)
            })
        fetch(`${URL_API}/turnos/?id_profesional=${state.id}`)
            .then(response => response.json())
            .then(data => {
                setTurnos(data)
            })
        fetch(`${URL_API}/usuarios/clientes/`)
            .then(response => response.json())
            .then(data => {
                setClientes(data)
            })
    }, [state.id])

    useEffect(() => {
        if (turnos.length === 0) return;
        let fecha_actual = new Date();
        let turnos_hoy = [];
        for (let i = 0; i < turnos.length; i++) {
            let date = new Date(turnos[i].hora_inicio);
            if ( date.getDate() === fecha_actual.getDate() && date.getMonth() === fecha_actual.getMonth() && date.getFullYear() === fecha_actual.getFullYear()) {
                turnos_hoy.push(turnos[i]);
            }
        }
        if (turnos_hoy.length > 0) {
            let min = turnos_hoy[0];
            turnos_hoy.forEach(turno => {
                let date1 = new Date(turno.hora_inicio);
                let date2 = new Date(min.hora_inicio);
                if (date1 < date2) {
                    min = turno;
                }
            });
            setHoraProximoTurno(new Date(min.hora_inicio));
            clientes.find(cliente => {
                if (cliente.id === min.id_cliente) {
                    setNombreCliente(cliente.nombre_completo);
                }
            });
        }
    }, [turnos]);

    return (
        <div id="render-pro" >
        <SupContainer nombre={profesional.nombre_completo} total_turnos={turnos.length}/>
        <TurnoProximo hora={`${hora_proximo_turno.getHours()}:${hora_proximo_turno.getMinutes()}`} nombre_cliente={nombre_cliente} />
        </div>
    )
}
export default Profesional