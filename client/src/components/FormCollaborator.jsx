import React from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useProjects } from '../hooks/useProjects';
import { Alert } from './Alert';

export const FormCollaborator = () => {
    const { id } = useParams()

    const { alertCollabo, showAlertCollabo, storeCollaborator } = useProjects();

    const { formValues, handleInputChange, reset } = useForm({
        email: "",
    })

    const { email } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([email].includes("")) {
            showAlertCollabo("Todos los campos son obligatorios")
            return null
        }

        storeCollaborator({
            email,
            idProject: id,
        })

    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
        >
            {
                alertCollabo.msg && <Alert {...alertCollabo} />
            }
            <h1 className='text-xl lg:text-3xl'>
                Agregar colaborador
            </h1>
            <div className="flex flex-wrap justify-center w-6/6 mt-5">
                <label
                    htmlFor="email"
                    className='w-full text-sm font-bold'
                >
                    EMAIL
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email del colaborador"
                    className='w-full rounded-sm px-3 py-2 mt-1'
                    value={email}
                    onChange={handleInputChange}
                    name="email"
                />
            </div>
            <button
                className={`w-full mt-5 bg-blue-600`}
            >
                <span className="text-sm font-bold">
                    Guardar
                </span>
            </button>


        </form>
    )
}
