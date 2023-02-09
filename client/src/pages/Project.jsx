import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil } from "../assets/pencil";
import { Plus } from "../assets/Plus";
import { UserPlus } from "../assets/UserPlus";
import { Alert } from "../components/Alert";
import { Collaborator } from "../components/Collaborator";
import { FormTask } from "../components/FormTask";

import { ProjectCard } from "../components/ProjectCard";
import { Spinner } from "../components/Spinner";
import { Task } from "../components/Task";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";

export const Project = () => {
    const { id } = useParams()

    const { loading, alert, showModalCollabo, handleShowModalCollabo, getProject, project } = useProjects();
    const { loadingTask, showModal, handleShowModal, tasks, getTasks } = useTasks()

    const { name, description, dateExpire, client, _id } = project

    useEffect(() => {
        getProject(id)
        getTasks(id)
    }, []);

    if (alert.msg) return <Alert {...alert} />
    return (
        <>
            {loading ? (<Spinner />) : (
                <div className="relative">
                    <div
                        className="flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300"
                        onClick={() => { showModal.state === false && handleShowModal({ state: true, method: "" }) }}
                    >
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

                            <hr className="border-b border-indigo-800" />
                            <p>{description}</p>
                            <div className="flex gap-4 justify-between items-center mt-8">
                                <p className="font-bold text-lg md:text-xl">
                                    Tareas del proyecto
                                </p>
                                <div
                                    className="flex gap-2 hover:text-indigo-600 cursor-pointer"
                                    onClick={() => handleShowModal({ state: !showModal.state, method: "AGREGAR" })}
                                >
                                    <Plus />
                                    <small className="hidden md:inline-block">Nueva Tarea</small>
                                </div>

                            </div>
                            {/* Aquí se mostrarán todas las tareas //todo: componente Task */}
                            <div className="max-h-screen overflow-y-auto">

                                {
                                    loadingTask
                                        ?
                                        <Spinner />
                                        :
                                        tasks.length
                                            ?
                                            tasks.map(task => <Task key={task._id} {...task} />)
                                            :
                                            <p>No hay tareas agregadas</p>
                                }
                            </div>

                            <div className="flex gap-4 justify-between items-center mt-8">
                                <p className="font-bold text-lg md:text-xl">
                                    Colaboradores
                                </p>
                                <div
                                    className="flex gap-2 hover:text-indigo-600 cursor-pointer"
                                    onClick={handleShowModalCollabo}
                                >
                                    <UserPlus />
                                    <small className="hidden md:inline-block">Agregar Colaborador</small>
                                </div>
                            </div>
                            {/* Aquí se mostrarán todos los colaboradores //todo: componente Collaborator */}
                            <div className="max-h-screen overflow-y-auto">
                                {
                                    project.collaborators.length
                                    ?
                                    project.collaborators.map(collaborator => <Collaborator key={collaborator._id} {...collaborator} />)
                                    :
                                    <p>No hay colaboradores agregados</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`mx-auto w-10/12 h-fit p-6 bg-gray-800 border rounded border-indigo-700 object-center transition ease-in-out z-10 duration-150 fixed inset-y-1/4 left-0 right-0 md:w-6/12 lg:w-5/12 xl:w-4/12 
                        ${showModal.state && "hidden"}`}
                    >
                        <FormTask />
                    </div>
                    <div className={`mx-auto w-10/12 h-fit p-6 bg-gray-800 border rounded border-indigo-700 object-center transition ease-in-out z-10 duration-150 fixed inset-y-1/4 left-0 right-0 md:w-6/12 lg:w-5/12 xl:w-4/12 
                        ${showModal.state && "hidden"}`}
                    >
                        <FormTask />
                    </div>
                </div>
            )
            }
        </>
    );
};