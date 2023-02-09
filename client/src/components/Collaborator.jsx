import React from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

export const Collaborator = ({name, email}) => {
  const { id } = useParams()

  const {deleteCollaborator} = useProjects()

  const handleDelete = () => {
    deleteCollaborator({email, idProject: id})
  }

  return (
    <div className="bg-gray-800 rounded mt-3 py-4 px-4 shadow-lg border border-indigo-900">
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <p className="text-center">
          {name}
          <span> | {email}</span>
        </p>
        <button
          onClick={handleDelete}
          className="h-10 px-2 py-1 bg-red-600 text-xs font-bold"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};