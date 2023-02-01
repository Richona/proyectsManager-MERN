import React from 'react'

export const RecoverPassword = () => {
  return (
    <div className="flex justify-center mt-20">
      <section className=' bg-gray-800 w-5/6 rounded py-8 px-8 lg:w-4/6 shadow-lg border border-indigo-900'>
        <h1 className='text-xl lg:text-3xl'>Reestablecé tu contraseña</h1>
        <form action="" >
          <div className='flex flex-wrap justify-center w-6/6 mt-5 '>
            <label className='w-full' htmlFor="password">Nueva contraseña</label>
            <input className='w-full rounded-sm pl-3 py-2 mt-1' id="password" type="password" placeholder="Escribí tu nueva contraseña"/>
          </div >
          <button type="submit" className='mt-5 border-gray-500'>
            Guardar tu contraseña
          </button>
        </form>
      </section>
    </div>
  )
}
