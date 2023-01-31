import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    return (
        <div className="flex justify-center mt-20">
            <section className='bg-gray-800 w-2/6 rounded py-8 px-8'>
                <h1>Iniciá sesión</h1>
                <form action="">
                    <div className='flex flex-wrap justify-center w-6/6 mt-5'>
                        <label htmlFor="email" className='w-full'>Correo electrónico</label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="email" type="email" placeholder="Ingrese su email"/>
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5'>
                        <label htmlFor="password" className='w-full'>Contraseña</label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="password" type="password" placeholder="Ingrese su contraseña"/>
                    </div>
                    <button type="submit" className=''>
                        Iniciar sessión
                    </button>
                </form>
                <nav>
                    <Link to={'/register'}>¿No tenés una cuenta? Registrate</Link>
                    <Link to={'/forget-password'}> Olvidé mi password</Link>
                </nav>
            </section>
        </div>
    )
}
