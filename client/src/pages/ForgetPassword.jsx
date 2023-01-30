import React from 'react'
import { Link } from 'react-router-dom'

export const ForgetPassword = () => {
    return (
        <>
            <h1 >
                Recupera tu acceso
            </h1>

            <form
                action=""
            >
                <div>
                    <label htmlFor="email" >
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                    />
                </div>
                <button
                    type="submit"
                >
                    Recuperar contraseña
                </button>
            </form>
            <nav>
                <Link to={"/registro"}>
                    ¿No tenés una cuenta? Registrate
                </Link>
                <Link to={"/ingresar"}>
                    ¿Estás registrado? Iniciá sesión
                </Link>
            </nav>
        </>
    )
}
