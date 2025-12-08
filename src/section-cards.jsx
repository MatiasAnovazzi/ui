import Card from "./modulos-jsx/card" // Ajusta la ruta si moviste el archivo
// Ya no importamos "./styles/section-cards.css" ni "./styles/cards.css"

import pic1 from "./img/logo-usd.svg"
import pic2 from "./img/calendario.png"
import pic3 from "./img/manos.svg"
import pic4 from "./img/refresh.svg"

function SectionCards() {
    return (
        // Contenedor principal con padding y un fondo gris muy suave para resaltar las cards blancas
        <div className="py-16 px-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                
                {/* GRID RESPONSIVO:
                    - grid-cols-1: Por defecto (celular)
                    - md:grid-cols-2: Pantallas medianas
                    - lg:grid-cols-4: Pantallas grandes
                    - gap-6: Espacio entre tarjetas
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card 
                        pic={pic1} 
                        titulo="Servicio gratuito" 
                        desc="Ahorra costos al no moverte de tu casa." 
                    />
                    <Card 
                        pic={pic2} 
                        titulo="En tiempo real" 
                        desc="Elige turnos libres sin llamadas ni mensajes." 
                    />
                    <Card 
                        pic={pic3} 
                        titulo="Conexión directa" 
                        desc="Agenda fácil tu turno sin intermediarios." 
                    />
                    <Card 
                        pic={pic4} 
                        titulo="Gestión flexible" 
                        desc="Cambia o cancela los turnos en un click." 
                    />
                </div>
                
            </div>
        </div>
    )
}

export default SectionCards