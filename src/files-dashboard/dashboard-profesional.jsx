import { useEffect, useState } from "react"
import { URL_API } from "../files-access/access"


function Profesional({state}){
const [persona, setPersona] = useState({})
const [store, setStore ] = useState([])

    useEffect(()=>{
        fetch(`${URL_API}/usuarios/${state.type}/${state.id}`)
        .then(response => response.json())
        .then(data => {
            setPersona(data)
        })
        fetch(`${URL_API}/turnos/${state.id}`)
        .then(response => response.json())
        .then(data => {
            setStore(data)
        })
    
    })

    return (
        <>
        Hola, profesional, sos {persona.nombre_completo}
        </>
    )
}
export default Profesional