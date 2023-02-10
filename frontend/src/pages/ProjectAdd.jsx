import React from 'react'
import { FormProject } from '../components/FormProject'
import { ProjectCard } from '../components/ProjectCard'

export const ProjectAdd = () => {
  return (
    <div className='flex flex-col gap-8 mt-20 mx-6 md:flex-row text-gray-300'>
      <ProjectCard />
      <div className='w-12/12 text-left md:w-9/12'>
        <h1 className='font-bold text-2xl md:text-4xl'>
          Crear proyecto
        </h1>
        <div className='bg-gray-800 w-6/6 rounded mt-3 pb-5 px-3 lg:w-6/6 shadow-lg border border-indigo-900'>
          <FormProject buttonText="GUARDAR PROYECTO"/>
        </div>
      </div>
    </div>
  )
} 