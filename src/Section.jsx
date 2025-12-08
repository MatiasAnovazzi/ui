

function Section (){
    return (
        <div id="derecha" className="flex flex-col justify-center p-8 md:p-12 bg-white">
    
            <section className="max-w-lg mx-auto md:mx-0">
                <h2 className="text-3xl md:text-4xl font-bold text-ui-800 mb-6 border-l-4 border-ui-500 pl-4">
                    ¿Qué es CliProApp?
                </h2>

                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p>
                        <strong className="text-ui-600 font-bold">CliProApp</strong> surge de la necesidad de un servicio que 
                        <strong className="text-ui-800 font-semibold"> conecte profesionales y clientes</strong>.
                    </p>

                    <p>
                        Tradicionalmente, solicitar un turno implicaba acercarse al lugar, hacer filas y perder tiempo. 
                        Todo esto nos hace <span className="text-red-500 font-medium">perder dinero</span> y paciencia.
                    </p>

                    <p className="bg-ui-100 p-4 rounded-lg border border-ui-200 text-ui-800 font-medium">
                        Esta app convierte una tarea de horas en algo de <span className="font-bold underline decoration-ui-500">5 minutos</span> que puedes hacer desde casa.
                    </p>
                </div>
            </section>

        </div>
    )
}
export default Section