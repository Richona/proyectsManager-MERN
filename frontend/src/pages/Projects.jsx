import React, { useEffect } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectPreview } from '../components/ProjectPreview';
import { Spinner } from '../components/Spinner';
import { useProjects } from '../hooks/useProjects';

export const Projects = () => {
  const { loading, alert, projects, getProjects } = useProjects();

  useEffect(() => {
    getProjects()
  }, []);

  return (
    <section className='flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300'>
      <ProjectCard />
      <div className='w-12/12 text-left md:w-9/12'>
        <h1 className='font-bold text-4xl mb-5'>
          Proyectos
        </h1>
        <div className='bg-gray-800 rounded py-4 px-4 shadow-lg border border-indigo-900 '>
          {
            loading
              ?
              <Spinner />
              :
              projects.length
                ?
                projects.map(project => <ProjectPreview key={project._id} {...project}/>)
                :
                <p>No hay proyectos agregados</p>
          }
        </div>
      </div>
    </section>
  )
}
