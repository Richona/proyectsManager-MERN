import React from 'react'
import { Link } from 'react-router-dom'

export const MenuGuest = () => {
  return (
    <>
    <div className="relative ml-3 sm:hidden">
        <Link to={"/login"} className="">
            <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <i className="fa-solid fa-right-to-bracket text-xl text-gray-400"></i>
            </button>
        </Link>
    </div>
    <div className="relative ml-3 hidden sm:block">
        <Link to={"/register"} className="">
            <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                Registrarse
            </button>
        </Link>
    </div>
    <div className="relative ml-3 hidden sm:block">
        <Link to={"/login"} className="">
            <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                Ingresar
            </button>
        </Link>
    </div>
</>
  )
}
