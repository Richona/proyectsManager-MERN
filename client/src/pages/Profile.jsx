import React, { useState } from 'react'
import { Pencil } from '../assets/Pencil';
import { XMark } from '../assets/XMark';
import { Alert } from '../components/Alert';
import { useForm } from '../hooks/useForm';
import useUsers from '../hooks/useUsers'

export const Profile = () => {
    const { alert, auth, updatedUser, user } = useUsers();

    const [pencilInput, setPencilInput] = useState(true);

    const { formValues, handleInputChange, reset } = useForm({
        name: user.name ? user.name : auth.name,
        email: "",
    })

    const { name, email } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        updatedUser({
            name,
            email
        })
    }

    return (
        <div className='mt-20 mx-6'>
            <h1 className='font-bold text-4xl'>
                Bienvenido {user.name ? user.name : auth.name}
            </h1>
            <div className='bg-gray-800 w-6/6 rounded mt-3 pb-5 px-3 shadow-lg border border-indigo-900'>
                {
                    alert.msg && <Alert {...alert} />
                }
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block '>
                        <label
                            htmlFor="name"
                            className='w-full'
                        >
                            Nombre
                        </label>
                        <input
                            className='w-full rounded-sm pl-3 py-2 mt-1'
                            id="name"
                            type="name"
                            placeholder="Ingrese su nombre"
                            autoComplete='off'
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-center w-6/6 mt-5 md:w-5/12 md:inline-block md:ml-10'>
                        <label
                            htmlFor="email"
                            className='w-full'
                        >
                            Correo electrónico
                        </label>
                        <div className='w-full relative'>
                            <input
                                className='w-full rounded-sm pl-3 py-2 mt-1'
                                id="email"
                                type="email"
                                placeholder={user.email ? user.email : auth.email}
                                name='email'
                                value={email}
                                disabled={pencilInput}
                                onChange={handleInputChange}
                            />
                            <div 
                                className={`absolute right-2.5 top-3`}
                                onClick={() => setPencilInput(!pencilInput)}>
                                {pencilInput ? <Pencil/> : <XMark/>}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className='mt-5 border-gray-500 disabled:bg-neutral-700'
                    /* disabled={sending} */
                    >
                        Guardar cambios
                    </button>
                </form>
            </div >
        </div >
    )
}
