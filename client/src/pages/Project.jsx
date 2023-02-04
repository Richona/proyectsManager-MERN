import React from "react";
import { Link } from "react-router-dom";
import { Pencil } from "../assets/pencil";
import { Plus } from "../assets/Plus";
import { UserPlus } from "../assets/UserPlus";

import { ProjectCard } from "../components/ProjectCard";
import { Task } from "../components/Task";

export const Project = () => {
    return (
        <div className="flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300">
            <ProjectCard />
            <div className="w-12/12 text-left md:w-9/12">
                <div className="flex gap-4 justify-between items-center">
                    <h1 className="font-bold text-2xl md:text-4xl">
                        Nombre del proyecto
                    </h1>
                    <Link
                        to={`/projects/edit-project/:id`}
                        className="flex gap-2"
                    >
                        <Pencil />
                        <small className="hidden md:inline-block">Editar</small>
                    </Link>

                </div>
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
                <small>Aun no hay colaboradores agregados</small>
                {/* Aquí se mostrarán todos los colaboradores //todo: componente Collaborator */}

            </div>
        </div>
    );
};