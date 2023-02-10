import React, { useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";

export const Task = ({_id, name, description, dateExpire, priority, state}) => {
    const {showModalCollabo, handleShowModalCollabo} = useProjects();
    const {showModal, handleShowModal, getTask, stateTask, deleteTask } = useTasks();

    const handleUpdate = async (id) => {
        await getTask(id)

        !showModalCollabo && handleShowModalCollabo()
        handleShowModal({state: !showModal.state, method: "EDITAR", task: "ok"})
    }

    const handleState = async (id) => {
        await stateTask(id)
    }

    const handleDelete = async (id) => {
        await deleteTask(id)
    }

    return (
        <div className="bg-gray-800 rounded mt-3 py-4 px-4 shadow-lg border border-indigo-900">
            <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                    <p>Nombre: {name}</p>
                    <small>Descripcion: {description}</small>
                    <p>Entrega: {dateExpire.split("T")[0]}</p>
                    <small>Prioridad: {priority}</small>
                </div>
                <div className="flex flex-wrap gap-3 mt-3 text-xs md:mt-0">
                    <button
                        className="h-10 px-2 py-1 bg-blue-600 font-bold"
                        onClick={() => handleUpdate(_id)}
                    >
                       Editar
                    </button>

                    <button
                        className={`h-10 px-2 py-1  font-bold ${state ? "bg-green-700":"bg-gray-600"}`}
                        onClick={() => handleState(_id)}
                    >
                        {state ? "Completada" : "Incompleta"} 
                    </button>

                    <button
                        className="h-10 px-2 py-1 bg-red-600  font-bold"
                        onClick={() => handleDelete(_id)}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};