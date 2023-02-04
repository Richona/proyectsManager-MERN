import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios';
import useAuth from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

export const Login = () => {
    const [alert, setAlert] = useState({});
    const {setAuth} = useAuth();
    const [sending, setSending] = useState(false);
    const [eyePassword, setEyePassword] = useState(false);

    const navigate = useNavigate();

    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg
        });
        if (time) {
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }

        reset()
    }

    const { formValues, handleInputChange, reset } = useForm({
        email: "",
        password: ""
    })

    const { email, password } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email, password].includes("")) {
            handleShowAlert("Todos los campos son obligatorios")
            return null
        }

        try {
            setSending(true)
            const {data} = await clientAxios.post(`/auth/login`, {
                email,
                password
            })
            setSending(false)

            Swal.fire({
                icon: "info",
                title: `Bienvenido ${data.user.name}!`,
                text: data.msg,
                confirmButtonText: "Ve a tus proyectos",
                allowOutsideClick: false
            }).then(result => {
                if (result.isConfirmed) {
                    navigate("/projects")
                }
            })

            setAuth(data.user)
            sessionStorage.setItem("token", data.token)

            reset()
        } catch (error) {
            console.error(error)
            handleShowAlert(error.response?.data.msg)
            reset()
        }

    }

    return (
        <div className="flex justify-center mt-20">
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-3 shadow-lg border border-indigo-900 lg:w-4/6 '>
                <h1 className='text-xl lg:text-3xl'>Iniciá sesión</h1>
                {
                    alert.msg && <Alert {...alert}/>
                }
                <form 
                    onSubmit={handleSubmit}
                    noValidate
                >
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
                            autoComplete='off'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
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
                                name='password'
                                value={password}
                                onChange={handleInputChange}
                            />
                            <i
                                className={`fa-regular ${eyePassword ? "fa-eye" : "fa-eye-slash"} absolute right-2.5 top-4`}
                                onClick={() => setEyePassword(!eyePassword)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className='mt-5 border-gray-500 disabled:bg-neutral-700'
                        disabled={sending}
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
