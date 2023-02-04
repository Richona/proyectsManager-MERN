import React from 'react'

export const NavBarUser = () => {
    return (
        <div className="flex space-x-4">
            <a 
                href="#" 
                className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" 
                aria-current="page"
            >
                Dashboard
            </a>

            <a 
                href="#" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
                Team
            </a>

            <a 
                href="#" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
                Projects
            </a>

            <a 
                href="#" 
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
                Calendar
            </a>
        </div>
    )
}