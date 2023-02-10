import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useUsers from '../hooks/useUsers';

export const ProjectCard = () => {
    const {auth} = useAuth();
    const {user} = useUsers();
    return (
        <div className='w-12/12 h-32 bg-gray-800 rounded py-4 px-3 shadow-lg border border-indigo-900 md:w-3/12'>
            <p className='text-left'>
                Hola: {user.name ? user.name : auth.name}
            </p>
            <Link
                to={"/projects/create-project"}
                className="w-full"
            >
                <button className='w-8/12 mt-5 px-2 border-gray-500 bg-gray-800 md:w-full'>
                    <small>NUEVO PROYECTO</small>
                </button>
            </Link>
        </div>
    )
}
