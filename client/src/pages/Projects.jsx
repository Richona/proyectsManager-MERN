import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectPreview } from '../components/ProjectPreview';
import useAuth from '../hooks/useAuth';

export const Projects = () => {
  const {auth} = useAuth();

  return (
    <section className='flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300'>
      <div className='w-12/12 h-32 bg-gray-800 rounded py-4 px-3 shadow-lg border border-indigo-900 md:w-3/12'>
        <p className='text-left'>
          Hola: {auth.name}
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
      <div className='w-12/12 text-left md:w-9/12'>
        <h1 className='font-bold text-4xl mb-5'>
          Proyectos
        </h1>
        <div className='bg-gray-800 rounded py-4 px-4 shadow-lg border border-indigo-900 '>
          <ProjectPreview />
          <ProjectPreview />
          <ProjectPreview />
        </div>
      </div>
    </section>
  )
}
