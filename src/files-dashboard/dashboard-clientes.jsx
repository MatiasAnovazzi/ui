import { useState, useEffect } from "react"
import Card from "./modules/card-profesionales"
import { URL_API } from "../files-access/access"
function Cliente ({state}){

const [persona, setPersona] = useState({})
const [store, setStore ] = useState([])

    useEffect(()=>{
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
        <p>hola desde cliente, sos {persona.nombre_completo}</p>
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