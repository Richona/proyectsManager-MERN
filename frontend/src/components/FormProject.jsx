import React, { useEffect, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";
import { useNavigate, useParams } from 'react-router-dom';

export const FormProject = ({ buttonText }) => {
    const navigate = useNavigate()

    const { alert, showAlert, storeProject, project } = useProjects();

    const { id } = useParams()

    const inputName = useRef(null)
    const inputDescription = useRef(null)
    const inputDateExpire = useRef(null)
    const inputClient = useRef(null)

    const { formValues, handleInputChange, reset, setFormValues } = useForm({
        name: "",
        description: "",
        dateExpire: "",
        client: ""
    })

    const { name, description, dateExpire, client } = formValues;

    useEffect(() => {
        if (id) {
            inputName.current.value = project.name
            inputDescription.current.value = project.description
            inputDateExpire.current.value = project.dateExpire && project.dateExpire.split("T")[0]
            inputClient.current.value = project.client

            setFormValues({
                name : project.name,
                description : project.description,
                dateExpire : project.dateExpire.split("T")[0],
                client : project.client
            })

        }

    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([name, description, dateExpire, client].includes("")) {
            showAlert("Todos los campos son obligatorios")
            return null
        }

        storeProject({
            id: id ? id: null,
            name,
            description,
            dateExpire,
            client
        })

        setTimeout(() => {
            navigate("/projects")
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
                    NOMBRE PROYECTO
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
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
                    placeholder="Descripción del proyecto"
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
                    NOMBRE CLIENTE
                </label>
                <input
                    id="client"
                    type="text"
                    placeholder="Nombre del cliente"
                    className='w-full rounded-sm px-3 py-2 mt-1'
                    value={client}
                    onChange={handleInputChange}
                    name="client"
                    ref={inputClient}
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