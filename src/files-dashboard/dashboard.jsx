import { useLocation } from "react-router-dom"
import Cliente from "./logica-clientes/dashboard-clientes"
import Profesional from "./logica-profesionales/dashboard-profesional"
function Dashboard(){
const location = useLocation()
const state = location.state

    return(
        <>
        {state.type == "clientes" && <Cliente state={state}/>}
        {state.type == "profesionales" && <Profesional state={state}/>}
        </>
        
    )
}
export default Dashboard