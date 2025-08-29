import "./styles/inicio.css"
import img from './img/ejemplo.png';
function Inicio(){
    return (
            <div id="inicio">
                <div id="izquierda">
                    <span><h1>Bienvenidos a <br /> CliProApp</h1>
                    <h2>Una <strong>solucion </strong> a tu medida para <br /> la <strong>gestion de turnos</strong> </h2>
                    </span>
                    <img className="img-inicio" src={img} />
                </div>
                
            </div>
    )
}
export default Inicio