import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
    const [eyePassword, setEyePassword] = useState(false);

    return (
        <div className="flex justify-center mt-20">
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-3 shadow-lg border border-indigo-900 lg:w-4/6 '>
                <h1 className='text-xl lg:text-3xl'>Iniciá sesión</h1>
                <form action="">
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block '>
                        <label
                            htmlFor="email"
                            className='w-full'
                        >
                            Correo electrónico
                        </label>
                        <input
                            className='w-full rounded-sm pl-3 py-2 mt-1'
                            id="email"
                            type="email"
                            placeholder="Ingrese su email"
                        />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block md:ml-10'>
                        <label
                            htmlFor="password"
                            className='w-full'
                        >
                            Contraseña
                        </label>
                        <div className='w-full relative'>
                            <input
                                className='w-full rounded-sm pl-3 py-2 mt-1'
                                id="password" 
                                type={eyePassword ? "text" : "password"}
                                placeholder="Ingrese su contraseña"
                            />
                            <i
                                class={`fa-regular ${eyePassword ? "fa-eye" : "fa-eye-slash"} absolute right-2.5 top-4`}
                                onClick={() => setEyePassword(!eyePassword)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className='mt-5 border-gray-500'
                    >
                        Iniciar sessión
                    </button>
                </form>
                <nav className='flex justify-between mt-5 md:mx-12'>
                    <Link to={'/register'} className="text-xs">¿No tenés una cuenta? Registrate</Link>
                    <Link to={'/forget-password'} className="text-xs"> Olvidé mi password</Link>
                </nav>
            </section>
        </div>
    )
}
