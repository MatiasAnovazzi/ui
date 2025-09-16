import "./styles/login.css"
import { useState } from "react"
import { URL_API } from "./access"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
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
            const response = await fetch(`${URL_API}/usuarios/${type}`)
            if (!response.ok) {
                alert("ERROR WACHIN")
                return
            }
            let url = await response.url
            console.log(url)
            let arr = await response.json()
            let id = 0
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].dni == value) {
                    id = arr[i].id
                    break
                }
            }
            if (id != 0) {
                navigate("/dashboard", {
                    state: {
                        id: id,
                        type: type
                    }
                })
            }
            else {
                alert("NO ENCONTRADO, WACHIN")
            }



        } catch (error) {
            console.error("Errorrrrrrr:", error)
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
