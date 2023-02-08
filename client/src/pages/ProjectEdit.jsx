import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Trash } from "../assets/Trash";
import { FormProject } from "../components/FormProject";
import { ProjectCard } from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";

export const ProjectEdit = () => {
    const navigate = useNavigate()
    const { deleteProject, project } = useProjects()

    const { id } = useParams()

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro de eliminar el proyecto?',
            showCancelButton: true,
            confirmButtonColor: 'red',
            confirmButtonText: 'Confirmar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject(id)

                setTimeout(() => {
                    navigate("/projects")
                }, 3000);
            }
        })
    }

    return (
        <div className='flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300'>
            <ProjectCard />
            <div className='w-12/12 text-left md:w-9/12'>
                <div className="flex gap-4 justify-between items-center">
                    <h1 className="font-bold text-2xl md:text-4xl">
                        Editar proyecto: {project.name}
                    </h1>
                    <div
                        className="flex gap-2"
                        onClick={handleDelete}
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