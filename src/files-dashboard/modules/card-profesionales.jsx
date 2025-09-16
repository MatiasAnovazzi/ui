import "../styles/card-profesionales.css"

function Card ({nombre, edad, especialidad}){
    return (
        <div className="card-p">
        <h3>{nombre}</h3>
        <p>
            Edad: {edad}
        </p>
        <p>Especialidad:{especialidad} </p>
        </div>
    )
}
export default Card