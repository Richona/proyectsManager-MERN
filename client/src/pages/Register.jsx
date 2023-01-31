import React from 'react'
import { Link } from 'react-router-dom'

export const Register = () => {
    return (
        <div className="flex justify-center mt-20">
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-8 lg:w-4/6' >
                <h1 className='text-xl lg:text-3xl'>Creá tu cuenta</h1>
                <form action="" >
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block '>
                        <label className='w-full' htmlFor="name">Nombre</label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="name" type="text" placeholder="Ingresá tu nombre" autoComplete='off' />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block md:ml-10'>
                        <label className='w-full' htmlFor="email">Correo electrónico</label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="email" type="email" placeholder="Ingresá tu email" />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block '>
                        <label className='w-full' htmlFor="password">Contraseña</label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="password" type="password" placeholder="Ingrese su contraseña" />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block md:ml-10'>
                        <label className='w-full' htmlFor="password2">Confirma tu contraseña</label>
                        <input className='w-full rounded-sm pl-3 py-2 mt-1' id="password2" type="password" placeholder="Ingrese su contraseña" />
                    </div>
                    <button type="submit" className='mt-5 border-gray-500'>
                        Crear cuenta
                    </button>
                </form>
                <nav className='mt-5'>
                    <Link to={'/login'} className="text-xs">
                        ¿Estás registrado? Iniciá sesión
                    </Link>
                </nav>
            </section>
        </div>
    )
}
