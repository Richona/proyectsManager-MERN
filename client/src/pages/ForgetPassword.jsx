import React from 'react'
import { Link } from 'react-router-dom'

export const ForgetPassword = () => {
    return (
        <div className="flex justify-center mt-20">
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-8 lg:w-4/6'>
                <h1 className='text-xl lg:text-3xl'>Recupera tu acceso</h1>
                <form action="">
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 '>
                        <label className='w-full' htmlFor="email" >
                            Correo electrónico
                        </label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="email" type="email" placeholder="Ingresá tu email" />
                    </div>
                    <button className='mt-5 border-gray-500' type="submit" >
                        Recuperar contraseña
                    </button>
                </form>
                <nav className='flex justify-between mt-5'>
                    <Link to={"/register"} className="text-xs">
                        ¿No tenés una cuenta? Registrate
                    </Link>
                    <Link to={"/login"} className="text-xs">
                        ¿Estás registrado? Iniciá sesión
                    </Link>
                </nav>
            </section>
        </div>
    )
}
