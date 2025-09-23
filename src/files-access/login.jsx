import "./styles/login.css"
import { useEffect, useState } from "react"
import { URL_API } from "./access"
import { useNavigate } from "react-router-dom"

function Login() {

    useEffect(()=>{
        document.body.style.backgroundColor = "#edf7ff"
    },[])


    const [register, setRegister] = useState("Acceder") 
    const navigate = useNavigate()
    const [value, setValue] = useState("")   // DNI
    const [type, setType] = useState("clientes") // default "clientes"

    const Submit = async (e) => {
        setRegister("Accediendo...")
        e.preventDefault()

        // Validación del DNI
        if (!value || isNaN(Number(value)) || Number(value) > 99999999) {
            setRegister("Acceder")
            alert("El dato ingresado es reverendamente incorrecto, tipea bien imbecil")
            return
        }

        try {
            const response = await fetch(`${URL_API}/usuarios/${type}`)
            if (!response.ok) {
                setRegister("Acceder")
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
                setRegister("Acceder")
                alert("NO ENCONTRADO, WACHIN")
            }



        } catch (error) {
            console.error("Errorrrrrrr:", error)
            setRegister("Acceder")
        }
    }

    return (
        <div id="login">
            <p id="login-encab">Ingresa tu documento</p>

            <input
                placeholder="Escriba aqui.."
                id="input-access"
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

            <button id="logged" onClick={Submit}><p>{register}</p></button>
        </div>
    )
}

export default Login
