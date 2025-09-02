import { Link } from 'react-router-dom'
import './styles/Nav.css'
function Nav(){
    return (
        <div id='nav'>
            <h1>CliProApp</h1>
            <div id='links'>
                <span><a href="">Acceder</a></span>
                <span><Link to="/register">Registrarse</Link></span>
            </div>
        </div>
    )
}
export default Nav