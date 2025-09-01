import { useEffect, useState } from "react"
import "./styles/formulario.css"
function Formulario () {
    const URLP = "https://api-cliproapp.up.railway.app/docs"
    const URL = "https://api-cliproapp.up.railway.app/"
    const [state, setState] = useState("Probando conexion a api...")

    useEffect(()=>{
        fetch(URLP).then(response => {
            if(response.ok){
                setState("Conexion exitosa")
            }
            else{
                setState("Error de conexion")
            }
        })
    })
    
    function enviar(){
        const nombre = document.getElementById("nombre").value
        const dni = document.getElementById("dni").value
        const edad = document.getElementById("edad").value
        const telefono = document.getElementById("telefono").value
        const seleccion = document.getElementById("seleccion").value
        console.log(nombre, dni, edad, telefono, seleccion)

        if(seleccion == "cliente"){

            const nuevo_cliente = {
                "nombre_completo" : nombre,
                "dni": dni,
                "edad": Number(edad),
                "telefono": telefono
            }
            
            fetch(URL + "usuarios/clientes",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(nuevo_cliente)
            }).then(response => response.json()).then(data => {
                console.log(data)
            })
        }


    }



    return(
        <>
            <div id="prueba">{state}</div>
            <div className="container-form">
                <div id="form">
                    <p>Nombre:</p>
                    <input type="text" id="nombre" placeholder="Ingresa un nombre" />
                    <p>DNI:</p>
                    <input type="text" id="dni"/>
                    <p>Edad:</p>
                    <input type="number" id="edad" />
                    <p>Telefono:</p>
                    <input type="text" id="telefono" />
                    <p>Cliente o usuario</p>
                    <select name="" id="seleccion">
                        <option value="cliente">Cliente</option>
                        <option value="profesional">Profesional</option>
                    </select>
                    <button onClick={enviar} > Registrarse </button>
                </div>
            </div>
        </>
    )
}
export default Formulario
