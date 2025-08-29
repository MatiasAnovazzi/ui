import Card from "./modulos-jsx/card"
import "./styles/section-cards.css"
import pic1 from "./img/logo-usd.svg"
import pic2 from "./img/calendario.png"
import pic3 from "./img/manos.svg"
import pic4 from "./img/refresh.svg"
function SectionCards(){
    return (
        <div className="cards-container">
            <Card pic={pic1} titulo={"Servicio gratuito"} desc={"Ahorra costos al no moverte de tu casa"}/>
            <Card pic={pic2} titulo={"En tiempo real"} desc={"Elegi turnos libres sin llamadas ni mensajes"} />
            <Card pic={pic3} titulo={"Conexión directa"} desc={"Agenda fácil tu turno sin intermediarios"} />
            <Card pic={pic4} titulo={"Gestión flexible"} desc={"Cambia o cancela los turnos en un click"} />
        </div>
    )
}
export default SectionCards