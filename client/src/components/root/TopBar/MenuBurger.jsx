import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export const MenuBurger = () => {
    const { auth } = useAuth()
    return (
        <>
            {
                auth._id ? (
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <div className='mb-4'>
                            <p className='text-xl text-gray-300'>Hola {auth.name}</p>
                        </div>
                        <Link
                            to="/projects/create-project"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page"
                        >
                            Nuevo proyecto
                        </Link>

                        <Link
                            to="/projects"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Proyectos
                        </Link>

                        <Link
                            to="/"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Calendar
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <Link
                            to="/login"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page"
                        >
                            Ingresar
                        </Link>

                        <Link
                            to="/register"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Registrarse
                        </Link>
                    </div>
                )
            }
        </>
    )
}
