import "./styles/turno.css"

function Turno ({titulo, hora_inicio, hora_fin, cliente, descripcion}){
    return(
        <div className="turno-card">
            <h4 className="titulo">{titulo}</h4>
            <p className="hora">{hora_inicio} - {hora_fin}</p>
            <p className="cliente">Con {cliente}</p>
            {descripcion && <p className="notas">Notas: {descripcion}</p>}
        </div>

    )
}
export default Turno