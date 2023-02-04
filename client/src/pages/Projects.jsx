import React from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectPreview } from '../components/ProjectPreview';

export const Projects = () => {

  return (
    <section className='flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300'>
      <ProjectCard />
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
