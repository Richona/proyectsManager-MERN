import React from 'react'
import { Link } from 'react-router-dom'

export const NavBarUser = () => {
    return (
        <div className="flex space-x-4">
            <Link 
                to="/projects/create-project" 
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" 
                aria-current="page"
            >
                Nuevo proyecto
            </Link>

            <Link
                to="/projects" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
                Proyectos
            </Link>

            <Link 
                to="/" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
                Calendar
            </Link>
        </div>
    )
}
