import { useNavigate } from 'react-router-dom';

function Cta() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center py-8">
            <button
                type="button"
                onClick={() => navigate('/register')} // Esto no recarga la página
                className="
                    bg-ui-600 text-white font-bold text-lg
                    py-3 px-10 rounded-full
                    shadow-lg hover:bg-ui-800 
                    transition-colors duration-300
                "
            >
                Registrarse ahora
            </button>
        </div>
    )
}
export default Cta