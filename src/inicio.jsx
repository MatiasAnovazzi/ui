
import img from './img/ejemplo.png';
function Inicio(){
    return (
<div 
  id="inicio" 
  className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
  style={{ backgroundImage: `url(${img})` }}
>
    {/* CAPA DE OSCURECIMIENTO (Overlay)
        Esto es vital: pone una capa del color de tu marca (ui-600) 
        al 80% de opacidad sobre la imagen para que el texto resalte. 
    */}
    <div className="absolute inset-0 bg-ui-700/60"></div>

    {/* CONTENIDO (Texto)
        Usamos relative y z-10 para que este div flote POR ENCIMA del overlay
    */}
    <div className="relative z-10 text-center text-white font-sans p-5 max-w-4xl">
        
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-md">
            Bienvenidos a <br /> CliProApp
        </h1>
        
        <h2 className="text-xl mb-6 md:text-3xl font-light">
            Una <strong className="font-bold text-white">solución</strong> a tu medida para <br /> 
            la <strong className="font-bold text-white">gestión de turnos</strong>
        </h2>
        <button className="mt-4 px-6 py-2 bg-ui-100 text-ui-600 font-bold rounded shadow-lg hover:bg-white transition">Comenzar</button>
    </div>
</div>
    )
}
export default Inicio