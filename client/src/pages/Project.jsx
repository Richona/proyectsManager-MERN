import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil } from "../assets/pencil";
import { Plus } from "../assets/Plus";
import { UserPlus } from "../assets/UserPlus";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";

import { ProjectCard } from "../components/ProjectCard";
import { Spinner } from "../components/Spinner";
import { Task } from "../components/Task";
import { useProjects } from "../hooks/useProjects";

export const Project = () => {
    const {id} = useParams()

    const { loading, alert, getProject, project } = useProjects();

    const { name, description, dateExpire, client, _id } = project

    useEffect(() => {
        getProject(id)
    }, [id]);

    if (alert.msg) return <Alert {...alert}/>

    return (
        <>
            {
                loading ? (<Spinner />) :
                    (
                        <div className="flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300">
                            <ProjectCard />
                            <div className="w-12/12 text-left md:w-9/12">
                                <div className="flex gap-4 justify-between items-center">
                                    <h1 className="font-bold text-2xl md:text-4xl">
                                        {name}
                                    </h1>
                                    <Link
                                        to={`/projects/edit-project/${_id}`}
                                        className="flex gap-2"
                                    >
                                        <Pencil />
                                        <small className="hidden md:inline-block">Editar</small>
                                    </Link>

                                </div>
                                <div className="flex justify-between">
                                    <h2 className="text-1xl uppercase font-bold">{client}</h2>
                                    <p>Fecha de entrega: {dateExpire && dateExpire.split("T")[0]}</p>
                                </div>
                                
                                <hr className="border-b border-indigo-800"/>
                                <p>{description}</p>
                                <div className="flex gap-4 justify-between items-center mt-8">
                                    <p className="font-bold text-lg md:text-xl">
                                        Tareas del proyecto
                                    </p>
                                    <div
                                        className="flex gap-2"
                                    /* onClick={} */
                                    >
                                        <Plus />
                                        <small className="hidden md:inline-block">Nueva Tarea</small>
                                    </div>

                                </div>
                                {/* Aquí se mostrarán todas las tareas //todo: componente Task */}
                                <Task />
                                <Task />
                                <Task />

                                <div className="flex gap-4 justify-between items-center mt-8">
                                    <p className="font-bold text-lg md:text-xl">
                                        Colaboradores
                                    </p>
                                    <div
                                        className="flex gap-2"
                                    /* onClick={} */
                                    >
                                        <UserPlus />
                                        <small className="hidden md:inline-block">Agregar Colaborador</small>
                                    </div>
                                </div>
                                {/* Aquí se mostrarán todos los colaboradores //todo: componente Collaborator */}
                                <Collaborator />
                                <Collaborator />
                                <Collaborator />
                            </div>
                        </div>
                    )
            }
        </>
    );
};