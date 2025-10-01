import "./styles/container-info.css"

function TurnoProximo({hora, nombre}){
    return(
        <div id="container-prox" >
            {nombre && hora ? `Tu proximo turno es a las ${hora} con ${nombre}`: `No tienes turnos proximos`}
        </div>
    )
}
export default TurnoProximo