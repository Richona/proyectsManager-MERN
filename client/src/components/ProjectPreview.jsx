import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = () => {
  return (
    <div className="border-b border-indigo-900">
      <div className="flex gap-5 justify-between py-3">
        <p>
          Nombre del proyecto
          <span>| Cliente</span>
        </p>
        <Link to={"/projects/:id"}>
          <small className="text-xs">
            VER PROYECTO
          </small>
        </Link>
      </div>
    </div>
  );
};

