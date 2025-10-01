import "./styles/card-profesionales.css"

function Card ({nombre, edad, especialidad}){
    return (
    <div className="card">
      <h2>{nombre}</h2>
      <p><strong>Edad:</strong> {edad}</p>
      <p><strong>Especialidad:</strong> {especialidad}</p>
    </div>
  )
}
export default Card