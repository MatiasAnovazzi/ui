import "./styles/login.css"
import { useState } from "react"
import { URL_API } from "./access"

function Login () {
    const [data,  setUserData] = useState()
    const [value, setValue] = useState("")   // DNI
    const [type, setType] = useState("clientes") // default "clientes"

    const Submit = async (e) => {
        e.preventDefault()

        // Validación del DNI
        if (!value || isNaN(Number(value)) || Number(value) > 99999999) {
            alert("El dato ingresado es reverendamente incorrecto, tipea bien imbecil")
            return
        }

        try {
            const response = await fetch(`${URL_API}/usuarios/${type}/${value}`)
            if (!response.ok) {
                alert("ERROR WACHIN")
                return
            }
            const data = await response.json()
            console.log(data)
            setUserData(data)
        } catch (error) {
            console.error("Error en la petición:", error)
        }
    }

    return (
        <div id="login">
            <p id="login-encab">Ingresa tu documento</p>
            
            <input 
                type="text" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
            />

            <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
            >
                <option value="clientes">Cliente</option>
                <option value="profesionales">Profesional</option>
            </select>

            <button id="logged" onClick={Submit}>Acceder</button>
        </div>
    )
}

export default Login
