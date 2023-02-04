import React from "react";

export const FormProject = ({ buttonText }) => {

    return (
        <form
            /* onSubmit={} */
            noValidate
        >
            <div className="flex flex-wrap justify-center w-6/6 mt-5">
                <label
                    htmlFor="name"
                    className='w-full text-sm font-bold'
                >
                    NOMBRE PROYECTO
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                    className='w-full rounded-sm px-3 py-2 mt-1'
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
                    placeholder="Descripción del proyecto"
                    className='w-full rounded-sm px-3 py-2 mt-1'
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
                />
            </div>
            <div className="flex flex-wrap justify-center w-6/6 mt-5 ">
                <label
                    htmlFor="client"
                    className='w-full text-sm font-bold'
                >
                    NOMBRE CLIENTE
                </label>
                <input
                    id="client"
                    type="text"
                    placeholder="Nombre del cliente"
                    className='w-full rounded-sm px-3 py-2 mt-1'
                />
            </div>
            <button
                className={`w-full mt-5 ${buttonText === "GUARDAR PROYECTO" ? "bg-blue-600" : "bg-green-600"}`}
            >
                <span className="text-sm font-bold">
                    {buttonText}
                </span>
            </button>


        </form>
    );
};