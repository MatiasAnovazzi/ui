import Encabezado from "./encabezado"
import Login from "./login"
import "./styles/access.css"
export const URL_API = "https://api-cliproapp.up.railway.app"
function Access(){
    return (
        <div id="access-container">
        <Encabezado />
        <Login />
        </div>
    )
}
export default Access