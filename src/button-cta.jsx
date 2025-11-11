function Cta() {
    return (
        <>
            <button
                type="button"
                className="cta-button"
                onClick={() => (window.location.href = '/register')}
            >
                <p>Registrarse ahora</p>
            </button>
        </>
    )
}
export default Cta