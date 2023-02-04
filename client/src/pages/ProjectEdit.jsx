import React from "react";
import { Trash } from "../assets/Trash";
import { FormProject } from "../components/FormProject";
import { ProjectCard } from "../components/ProjectCard";

export const ProjectEdit = () => {
    return (
        <div className='flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300'>
            <ProjectCard />
            <div className='w-12/12 text-left md:w-9/12'>
                <div className="flex gap-4 justify-between items-center">
                    <h1 className="font-bold text-2xl md:text-4xl">
                        Editar proyecto: Nombre del proyecto
                    </h1>
                    <div 
                        className="flex gap-2"
                        /* onClick={} */
                    >
                        <Trash />
                        <small className="hidden md:inline-block">Eliminar</small>
                    </div>
                </div>
                <div className='bg-gray-800 w-6/6 rounded mt-3 pb-5 px-3 lg:w-6/6 shadow-lg border border-indigo-900'>
                    <FormProject buttonText="ACTUALIZAR CAMBIOS" />
                </div>
            </div>
        </div>
    );
};