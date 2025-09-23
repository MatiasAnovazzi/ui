import { Link } from 'react-router-dom'
import './styles/Nav.css'
import { useEffect } from 'react'
function Nav(){
    useEffect(()=>{
        document.body.style.backgroundColor = "#edf7ff"
    })
    return (
        <>
        <div id='nav'>
            <h1>CliProApp</h1>
            <div id='links'>
                <span><Link to="/access">Acceder</Link></span>
                <span><Link to="/register">Registrarse</Link></span>
            </div>
        </div>
        </>
    )
}
export default Nav