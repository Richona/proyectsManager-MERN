import React from "react";

export const Task = ({name, description, dateExpire, priority}) => {
    
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
                    /* onClick={} */
                    >
                       Editar
                    </button>

                    <button
                        className="h-10 px-2 py-1 bg-gray-600 font-bold"
                    >
                        Incompleta
                    </button>

                    <button
                        className="h-10 px-2 py-1 bg-red-600  font-bold"
                    /* onClick={} */
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};