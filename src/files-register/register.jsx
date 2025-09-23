import { useEffect } from "react"
import Encabezado from "./encabezado.jsx"
import Formulario from "./Forrmulario.jsx"
import "./styles/register.css"

function Register (){
    useEffect(()=>{
        document.body.style.backgroundColor = "#1d9a98"
        return ()=>{
            document.body.style.backgroundColor = ""
        }
    },[])
    return(
    <div id="rooted" >
        <Encabezado/>
        <Formulario/> 
    </div>
        )
}
export default Register