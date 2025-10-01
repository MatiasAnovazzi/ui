import "./styles/container-encab.css"

function Encab({nombre}){
    return (
        <div className="container-encab">
        <h1 id="encab" >Hola {nombre}! Que buscas hoy?</h1>
        </div>
    )
}
export default Encab