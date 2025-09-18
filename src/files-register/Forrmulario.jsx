import { useState, useEffect } from "react"
import "./styles/formulario.css"
import { Link } from "react-router-dom"
import Access from "../files-access/access"
function Formulario() {
    const URLP = "https://api-cliproapp.up.railway.app/docs"
    const URL = "https://api-cliproapp.up.railway.app/"

    const [state, setState] = useState("Probando conexión a API...")
    const [className, setClassName] = useState("disappear")
    const [register, setRegister] = useState("Registrarse")

    // Estados de los inputs
    const [nombre, setNombre] = useState("")
    const [dni, setDni] = useState("")
    const [edad, setEdad] = useState("")
    const [telefono, setTelefono] = useState("")
    const [seleccion, setSeleccion] = useState("cliente")
    const [especialidad, setEspecialidad] = useState("")

    // Probar conexión a la API al montar
    useEffect(() => {
        fetch(URLP)
            .then(response => {
                if (response.ok) {
                    setState("Conexión exitosa")
                    
                } else {
                    setState("Error de conexión")
                }
            })
            .catch(() => setState("Error de conexión"))
    }, [])

    // Manejar cambio en el select
    function handleChange(e) {
        const value = e.target.value
        setSeleccion(value)
        if (value === "profesional") {
            setClassName("")
        } else {
            setClassName("disappear")
        }
    }

    // Enviar datos a la API
    function enviar() {
        setRegister("Registrando...")
        if (seleccion === "cliente") {
            const nuevo_cliente = {
                nombre_completo: nombre,
                dni,
                edad: Number(edad),
                telefono
            }

            fetch(URL + "usuarios/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo_cliente)
            })
                .then(res => res.json())
                .then(data => {
                    if (data){
                        setRegister("Registro extremadamente exitoso")
                    }
                    console.log(data)
                })
        } else {
            const nuevo_profesional = {
                nombre_completo: nombre,
                dni,
                edad: Number(edad),
                telefono,
                especialidad
            }

            fetch(URL + "usuarios/profesionales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevo_profesional)
            })
                .then(res => res.json())
                .then(data => {
                    if (data){
                        setRegister("Registro extremadamente exitoso")
                    }
                    console.log(data)
                })
        }
    }

    return (
        <>
            <div className="container-form">
                <div id="form">
                    <p>Nombre:</p>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ingresa un nombre"/>

                    <p>DNI:</p>
                    <input type="text" value={dni} onChange={e => setDni(e.target.value)} placeholder="Ingresa un DNI" />

                    <p>Edad:</p>
                    <input type="number" value={edad} onChange={e => setEdad(e.target.value)} placeholder="Ingresa tu edad" />

                    <p>Teléfono:</p>
                    <input type="text" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Ingresa tu telefono" />

                    <p>Cliente o usuario</p>
                    <select id="seleccion" value={seleccion} onChange={handleChange}>
                        <option value="cliente">Cliente</option>
                        <option value="profesional">Profesional</option>
                    </select>

                    <div id="espec" className={className}>
                        <p className="p-div">Especialidad</p>
                        <input type="text" value={especialidad} onChange={e => setEspecialidad(e.target.value)} placeholder="Ingrese su especialidad" />
                    </div>
                    <button id="enviar" onClick={enviar}><p>{register}</p></button>

                </div>
                <p className="p-login" >Ya tienes una cuenta? <Link to="/access" >Iniciar sesion</Link> </p>
            </div>
        </>
    )
}

export default Formulario
