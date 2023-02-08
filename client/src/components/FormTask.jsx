import React from 'react'
import { useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useTasks } from '../hooks/useTasks';
import { Alert } from './Alert';

export const FormTask = () => {
    const { alert, showAlert, showModal, handleShowModal, storeTask } = useTasks();

    const { id } = useParams()

    const { formValues, handleInputChange, reset } = useForm({
        name: "",
        description: "",
        dateExpire: "",
        priority: ""
    });
    const { name, description, dateExpire, priority } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([name, description, dateExpire, priority].includes("")) {
            showAlert("Todos los campos son obligatorios")
            return null
        }

        storeTask({
            id: null,
            name,
            description,
            dateExpire,
            priority,
            project: id
        })

        setTimeout(() => {
            handleShowModal(!showModal)
        }, 3000);
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
        >
            {
                alert.msg && <Alert {...alert} />
            }
            <div className="flex flex-wrap justify-center w-6/6 mt-5">
                <label
                    htmlFor="name"
                    className='w-full text-sm font-bold'
                >
                    NOMBRE DE LA TAREA
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className='w-full rounded-sm px-3 py-2 mt-1'
                    value={name}
                    onChange={handleInputChange}
                    name="name"
                />
            </div>
            <div className="flex flex-wrap justify-center w-6/6 mt-5">
                <label
                    htmlFor="description"
                    className='w-full text-sm font-bold'
                >
                    DESCRIPCIÓN
                </label>
                <textarea
                    id="description"
                    type="text"
                    style={{ resize: "none" }}
                    placeholder="Descripción de la tarea"
                    className='w-full rounded-sm px-3 py-2 mt-1'
                    value={description}
                    onChange={handleInputChange}
                    name="description"
                />
            </div>
            <div className="flex flex-wrap justify-center w-6/6 mt-5 ">
                <label
                    htmlFor="date-expire"
                    className='w-full text-sm font-bold'
                >
                    FECHA DE ENTREGA
                </label>
                <input
                    id="date-expire"
                    type="date"
                    className='w-full rounded-sm px-3 py-2 mt-1'
                    value={dateExpire}
                    onChange={handleInputChange}
                    name="dateExpire"
                />
            </div>
            <div className="flex flex-wrap justify-center w-6/6 mt-5 ">
                <label
                    htmlFor="client"
                    className='w-full text-sm font-bold'
                >
                    Prioridad
                </label>
                <select 
                    className='border w-full p-2 mt-2 placeholder-grey-400 rounded-md'
                    name='priority'
                    onChange={handleInputChange}
                >
                    <option 
                        value=""
                        hidden
                        defaultValue={true}
                        key=""
                    >
                        Seleccione...
                    </option>
                    {
                        ['Baja', 'Media', 'Alta'].map(prioridad => (
                            <option value={prioridad} key={prioridad}>
                                {prioridad}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button
                className={`w-full mt-5 ${true ? "bg-blue-600" : "bg-green-600"}`}
            >
                <span className="text-sm font-bold">
                    {true ? "GUARDAR TAREA" : "EDITAR TAREA"}
                </span>
            </button>


        </form>
    )
}
