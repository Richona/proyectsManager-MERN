import React from 'react'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <div className="flex flex-shrink-0 items-center">
            <Link to={"/"}>
                <img 
                    className="block h-8 w-auto lg:hidden" 
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" 
                    alt="Your Company" 
                />
            </Link>
            
            <Link to={"/"}> 
                <img 
                    className="hidden h-8 w-auto lg:block ml-2" 
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" 
                    alt="Your Company" 
                />
            </Link>
        </div>
    )
}
