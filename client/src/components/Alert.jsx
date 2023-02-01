import React from 'react'

export const Alert = ({msg}) => {
  return (
    <div className='bg-red-400 text-center p-3 rounded-md uppercase text-white font-bold text-sm mx-1 my-5 md:mx-12'>
        {msg}
    </div>
  )
}
