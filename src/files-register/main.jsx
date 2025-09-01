import { createRoot } from "react-dom/client"
import "./styles/register.css"
import Encabezado from "./encabezado.jsx"
import Formulario from "./Forrmulario.jsx"
let root = createRoot(document.getElementById("root"))
root.render(
    <>
        <Encabezado/>
        <Formulario/>
        
    </>
)