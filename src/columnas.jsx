import "./styles/columnas.css"

function Columnas(){
    return (
        <div id="columnas">
            <h3>¿Como se usa?</h3>
            <div id="contenedor">
                <div id="left">
                <h2 className="encab" >Clientes</h2>
                <ul id="ul-left">
                    <li>Te registras como cliente</li>
                    <li>Buscas el profesional de tu eleccion</li>
                    <li>Luego de observar la disponibilidad horaria, seleccionas el horario y agendas el turno</li>
                    <li>Y listo! la app te recuerda tu turno mediante recordatorios por Whatsapp tu turno</li>
                </ul>
            </div>
            <div id="right">
                <h2 className="encab" >Profesionales</h2>
                <ul id="ul-right">
                    <li>Te registras como profesional</li>
                    <li>Cargas tu actividad y disponibilidad horaria</li>
                    <li>Y listo! Cuando un cliente cargue un nuevo turno, podes visuarlizarlo desde tu pagina personal</li>
                </ul>
            
                </div>
            </div>
        </div>
    )
}
export default Columnas