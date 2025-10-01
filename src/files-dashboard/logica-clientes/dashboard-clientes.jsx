import { useState, useEffect } from "react"
import Card from "./modules/card-profesionales"
import { URL_API } from "../../files-access/access"
import Encab from "./container-encab"
import TurnoProximo from "../logica-profesionales/container-info"
function Cliente ({state}){

const [persona, setPersona] = useState({})
const [store, setStore ] = useState([])

    useEffect(()=>{
        document.body.style.backgroundColor = "white"
        fetch(`${URL_API}/usuarios/${state.type}/${state.id}`)
    .then(response => response.json())
    .then(data => {
        setPersona(data)
    })

    fetch(`${URL_API}/usuarios/profesionales/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setStore(data)})
    
    },[])
    return (
        <>
        <Encab nombre={persona.nombre_completo} />
        <TurnoProximo hora={"23:45"} nombre={"boringo"} />
        <h1>LISTA DE PROFESIONALES</h1>
        {
            store.map((e,i)=> (
                <Card 
                key={i}
                nombre={e.nombre_completo} 
                edad={e.edad}
                especialidad={e.especialidad}
                />
            ))
        }
        </>
    )
}
export default Cliente