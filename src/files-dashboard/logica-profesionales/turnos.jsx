import Turno from "./modules/turno"
import "./styles/turnos.css"
function Turnos ({turnos, clientes}){
    console.log(clientes)
    return (
        <div id="container-turnos">
            {
                turnos.map((turno, index) => <Turno
                    key={index} 
                    titulo={turno.titulo} 
                    hora_inicio={`${new Date(turno.hora_inicio).getHours() <= 9 ? `0${new Date(turno.hora_inicio).getHours()}`: new Date(turno.hora_inicio).getHours()}:${new Date(turno.hora_inicio).getMinutes() <= 9 ? `0${new Date(turno.hora_inicio).getMinutes()}`: new Date(turno.hora_inicio).getMinutes()}`} 
                    hora_fin={`${new Date(turno.hora_fin).getHours() <= 9 ? `0${new Date(turno.hora_fin).getHours()}`: new Date(turno.hora_fin).getHours()}:${new Date(turno.hora_fin).getMinutes() <= 9 ? `0${new Date(turno.hora_fin).getMinutes()}`: new Date(turno.hora_fin).getMinutes()}`} 
                    cliente={clientes.find((cliente) => cliente.id === turno.id_cliente).nombre_completo}
                    descripcion={turno.descripcion}/>)
            }
        </div>
    )
}
export default Turnos