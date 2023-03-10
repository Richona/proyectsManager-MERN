import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';
import { Burger } from './Burger';
import { Logo } from './Logo';
import { MenuBurger } from './MenuBurger';
import { MenuGuest } from './MenuGuest';
import { MenuUser } from './MenuUser';
import { NavBarUser } from './NavBarUser';
import { Search } from './Search';

export const TopBar = () => {
    const [showMenu, setShowMenu] = useState(true);
    const { auth } = useAuth()

    return (
        <nav className="bg-gray-800 rounded-b-2xl border-b border-indigo-900 lg:border-r lg:border-l">
            <div className="mx-auto max-w-7xl">
                <div className="relative flex h-24 items-center justify-between mx-4">
                    {/* BUTTON MOBILE */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            <Burger />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:flex-none sm:items-stretch sm:justify-start">
                        <Logo />
                        <div className="hidden sm:ml-6 sm:block">
                            {auth._id && (
                                <NavBarUser />
                            )}
                        </div>
                    </div>
                    {/* BUSCADOR */}
                    {auth._id && (
                        <div className="relative w-2/5 hidden sm:block">
                            <Search />
                        </div>
                    )}

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                        {/* <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                        </button> */}

                        {auth._id ? (
                            <MenuUser />
                        ) : (
                            <MenuGuest />
                        )
                        }

                    </div>
                </div>
            </div>

            <div
                className={`${showMenu && 'hidden'} sm:hidden`}
                id="mobile-menu"
            >
                <MenuBurger />
            </div>
        </nav>
    )
}
