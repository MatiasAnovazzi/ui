import { Routes, Route } from "react-router-dom";
import Ui from "./Ui";
import "./styles/index.css"
import Register from "./files-register/register";
function App (){
    return (
        <Routes>
            <Route path="/" element={<Ui/>} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}
export default App