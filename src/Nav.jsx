import { Link } from 'react-router-dom'

import { useEffect } from 'react'
function Nav(){
    useEffect(()=>{
        document.body.style.backgroundColor = "#edf7ff"
    })
    return (
        <>
        <div id='nav' className='flex bg-ui-100 p-4 justify-between items-center shadow-md font-sans h-17' >
            <h1>CliProApp</h1>
            <div id='links' className='flex gap-4 '>
                <span><Link to="/access" className='text-ui-500 hover:text-shadow-2xl text-ui-800 transition-all' >Acceder</Link></span>
                <span><Link to="/register" className='text-ui-500 hover:text-shadow-2xl text-ui-800 transition-all'>Registrarse</Link></span>
            </div>
        </div>
        </>
    )
}
export default Nav