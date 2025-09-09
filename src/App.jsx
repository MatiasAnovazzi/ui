import { Routes, Route } from "react-router-dom";
import Ui from "./Ui";
import "./styles/index.css"
import Register from "./files-register/register";
import Access from "./files-access/access"
function App () {
    return (
        <Routes>
            <Route path="/" element={<Ui/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/access" element={<Access />} />
        </Routes>
    )
}
export default App