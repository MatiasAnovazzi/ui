import { useLocation } from "react-router-dom"
import { URL_API } from "../files-access/access"
import { useState } from "react"
function Dashboard(){
const [nombre, setNombre] = useState("")
const location = useLocation()
const state = location.state
console.log(state)


    fetch(`${URL_API}/usuarios/${state.type}/${state.id}`)
    .then(response => response.json())
    .then(data => {
        setNombre(data.nombre_completo)
    })
    

    return(
        <>
        <p>Bienvenido, {nombre}</p>
        </>
    )
}
export default Dashboard