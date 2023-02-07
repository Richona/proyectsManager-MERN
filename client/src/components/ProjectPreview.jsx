import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({name, _id, client}) => {
  return (
    <div className="border-b border-indigo-900">
      <div className="flex gap-5 justify-between py-3">
        <p>
          {name}
          <span>{` | ${client}`}</span>
        </p>
        <Link to={`/projects/${_id}`}>
          <small className="text-xs">
            VER PROYECTO
          </small>
        </Link>
      </div>
    </div>
  );
};

