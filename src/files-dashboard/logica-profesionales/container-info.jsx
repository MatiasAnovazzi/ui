import "./styles/container-info.css"

function TurnoProximo({hora, nombre_cliente}){
    return(
        <div id="container-prox" >
            {nombre_cliente ? `Tu proximo turno es a las ${hora} con ${nombre_cliente}`: `No tienes turnos proximos`}
        </div>
    )
}
export default TurnoProximo