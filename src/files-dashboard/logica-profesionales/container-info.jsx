function TurnoProximo({hora, nombre_cliente}){
    return(
        <>
        {nombre_cliente ? `Tu proximo turno es a las ${hora} con ${nombre_cliente}`: `No tienes turnos proximos`}
        
        </>
    )
}
export default TurnoProximo