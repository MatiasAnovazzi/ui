import { useEffect } from "react";
// Importar el logo para que Vite lo empaquete y proporcione la URL correcta
import logo from './img/logo.png';

export default function FaviconSetter() {
  useEffect(() => {
    // 1. Verificar si ya existe un link de favicon
    let link = document.querySelector("link[rel~='icon']");
    
    // 2. Si no existe, crear el elemento <link>
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    // 3. Establecer la URL del logo importado (que incluye el hash de Vite)
    link.href = logo;
    link.type = 'image/png';
    // No se necesita limpieza (cleanup) ya que el favicon debe persistir
    // en todas las rutas y es global.
  }, []);

  return null; // Este componente no renderiza nada visible
}