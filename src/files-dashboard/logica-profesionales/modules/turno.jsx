import "./styles/turno.css"

function Turno ({titulo, hora_inicio, hora_fin, cliente, descripcion}){
    return(
        <div className="turno-card">
         <h4>{titulo}</h4>
        <span><p>{hora_inicio}-{hora_fin}</p></span>
        <p>con {cliente}</p>
        <p>notas: {descripcion} </p>
        </div>
    )
}
export default Turno