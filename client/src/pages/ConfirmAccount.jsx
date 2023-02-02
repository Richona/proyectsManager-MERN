import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { clientAxios } from '../config/clientAxios';
import { Alert } from '../components/Alert';

export const ConfirmAccount = () => {
    const { token } = useParams();

    const navigate = useNavigate();

    const [alert, setAlert] = useState({});

    const handleShowAlert = (msg) => {
        setAlert({ msg });

    }

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const data = await clientAxios.get(`/auth/checked?token=${token}`)

                Swal.fire({
                    icon: "info",
                    title: "Felicitaciones!",
                    text: data.msg,
                    confirmButtonText: "Inicia sesion",
                    allowOutsideClick: false
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate("/login")
                    }
                })
            } catch (error) {
                console.error(error)
                handleShowAlert(error.response?.data.msg)
            }
        }

        confirmAccount();

    }, []);

    return (
        <div className="flex justify-center mt-20">
            <section className=' bg-gray-800 w-5/6 rounded py-8 px-8 lg:w-4/6 shadow-lg border border-indigo-900'>
                <h1>
                    Confirma tu cuenta
                </h1>
                <div className='mt-5 border-gray-500'>
                    {
                        alert.msg && (
                            <>
                                <Alert {...alert} />
                                <nav className='flex justify-between mt-5 md:mx-12'>
                                    <Link to={'/register'} className="text-xs">¿No tenés una cuenta? Registrate</Link>
                                    <Link to={'/login'} className="text-xs">¿Estás registrado? Iniciá sesión</Link>
                                </nav>
                            </>
                        )
                    }


                </div>
            </section>
        </div>
    )
}
