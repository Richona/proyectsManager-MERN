import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { XMark } from '../assets/XMark';
import { useForm } from '../hooks/useForm';
import { useTasks } from '../hooks/useTasks';
import { Alert } from './Alert';

export const FormTask = () => {
    const { alert, showAlert, showModal, handleShowModal, task, storeTask } = useTasks();

    const { id } = useParams()

    const inputName = useRef(null)
    const inputDescription = useRef(null)
    const inputDateExpire = useRef(null)
    const inputPriority = useRef(null)

    const { formValues, handleInputChange, reset, setFormValues } = useForm({
        name: "",
        description: "",
        dateExpire: "",
        priority: ""
    });

    const { name, description, dateExpire, priority } = formValues;

    useEffect(() => {
        if (showModal.task) {
            inputName.current.value = task.name
            inputDescription.current.value = task.description
            inputDateExpire.current.value = task.dateExpire && task.dateExpire.split("T")[0]
            inputPriority.current.value = task.priority

            setFormValues({
                name: task.name,
                description: task.description,
                dateExpire: task.dateExpire && task.dateExpire.split("T")[0],
                priority: task.priority
            })
        } else {
            setFormValues({
                name: "",
                description: "",
                dateExpire: "",
                priority: false
            })
        }

    }, [showModal.task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([name, description, dateExpire, priority].includes("")) {
            showAlert("Todos los campos son obligatorios")
            return null
        }

        storeTask({
            idTask: task && task._id,
            method: showModal.method,
            name,
            description,
            dateExpire,
            priority,
            project: id
        })

        setTimeout(() => {
            handleShowModal({state: !showModal.state, method: ""})
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
            <div 
                className='flex justify-end mb-4'
                onClick={() => {showModal.state === false && handleShowModal({state: true, method: ""})}}
            >
                <XMark/>
            </div>
            <h1 className='font-bold text-2xl md:text-4xl'>{showModal.method} TAREA</h1> 
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
                    ref={inputName}
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
                    ref={inputDescription}
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
                    ref={inputDateExpire}
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
                    ref={inputPriority}
                    value={priority}
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
                className={`w-full mt-5 ${showModal.method === "AGREGAR" ? "bg-blue-600" : "bg-green-600"}`}
            >
                <span className="text-sm font-bold">
                    {showModal.method === "AGREGAR" ? "AGREGAR TAREA" : "EDITAR TAREA"}
                </span>
            </button>


        </form>
    )
}
