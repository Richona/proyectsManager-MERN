import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios';
import { useForm } from '../hooks/useForm';
import Swal from "sweetalert2"

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {
    const [alert, setAlert] = useState({});
    const [sending, setSending] = useState(false);

    const { formValues, handleInputChange, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const { name, email, password, password2 } = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([name, email, password, password2].includes("")) {
            handleShowAlert("Todos los campos son obligatorios")
            return null
        }

        if (!exRegEmail.test(email)) {
            handleShowAlert("El email tiene un formato invalido")
            return null
        }

        if (password !== password2) {
            handleShowAlert("Las contraseñas no coinciden")
            return null
        }

        try {
            setSending(true)
            const { data } = await clientAxios.post('/auth/register', {
                name,
                email,
                password
            });
            setSending(false)

            Swal.fire({
                icon: "info",
                title: "Gracias por registrarte!",
                text: data.msg
            })

            reset()

        } catch (error) {
            console.error(error)
            handleShowAlert(error.response.data.msg)
            reset()
        }
    }

    const handleShowAlert = (msg) => {
        setAlert({
            msg
        });
        setTimeout(() => {
            setAlert({})
        }, 3000);
    }

    return (
        <div className="flex justify-center mt-20">
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-3 lg:w-4/6 shadow-lg border border-indigo-900' >
                <h1 className='text-xl lg:text-3xl'>Creá tu cuenta</h1>
                {
                    alert.msg && <Alert {...alert} />
                }
                <form
                    action=""
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block '>
                        <label className='w-full' htmlFor="name">Nombre</label>
                        <input
                            className='w-full rounded-sm pl-3 py-2 mt-1'
                            id="name"
                            type="text"
                            placeholder="Ingresá tu nombre"
                            autoComplete='off'
                            value={name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block md:ml-10'>
                        <label className='w-full' htmlFor="email">Correo electrónico</label>
                        <input
                            className='w-full 
                            rounded-sm pl-3 py-2 mt-1'
                            id="email" type="email"
                            placeholder="Ingresá tu email"
                            value={email}
                            name="email"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block '>
                        <label className='w-full' htmlFor="password">Contraseña</label>
                        <input
                            className='w-full rounded-sm pl-3 py-2 mt-1'
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            name="password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block md:ml-10'>
                        <label className='w-full' htmlFor="password2">Confirma tu contraseña</label>
                        <input
                            className='w-full rounded-sm pl-3 py-2 mt-1'
                            id="password2"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password2}
                            name="password2"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className='mt-5 border-gray-500 disabled:bg-neutral-700'
                        disabled = {sending}
                    >
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
