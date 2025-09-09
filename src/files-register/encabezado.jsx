import "./styles/encabezado.css"
import { MediaQuery } from 'react-responsive'
function Encabezado (){
    return (
       <div>
    <MediaQuery query="(min-width: 1224px)">
      <p>Esto se muestra en escritorio o laptop</p>
    </MediaQuery>
    <MediaQuery query="(max-width: 767px)">
      <p>Esto se muestra en móvil</p>
    </MediaQuery>
  </div>

    )
}
export default Encabezado