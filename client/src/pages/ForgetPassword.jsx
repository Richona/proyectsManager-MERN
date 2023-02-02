import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios';

export const ForgetPassword = () => {
    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            handleShowAlert("El email es requerido")
            return null
        }

        try {

            setSending(true)
            const {data} = await clientAxios.post(`auth/send-token`,{
                email
            })
            setSending(false)

            Swal.fire({
                icon: "info",
                title: "Revisa tus correos!",
                text: data.msg,
                confirmButtonText: "Ok",
                allowOutsideClick: false
            })

            setEmail("")

        } catch (error) {
            console.error(error)
            handleShowAlert(error.response?.data.msg)
            setEmail("")
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
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-8 lg:w-4/6 shadow-lg border border-indigo-900'>
                <h1 className='text-xl lg:text-3xl'>Recupera tu acceso</h1>
                {
                    alert.msg && <Alert {...alert}/>
                }
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 '>
                        <label className='w-full' htmlFor="email" >
                            Correo electrónico
                        </label>
                        <input 
                            className='w-full rounded-sm pl-3 py-2 mt-1' 
                            id="email" 
                            type="email" 
                            placeholder="Ingresá tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button 
                        className='mt-5 border-gray-500 disabled:bg-neutral-700' 
                        type="submit"
                        disabled={sending}
                    >
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
