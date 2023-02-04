import React from 'react'

export const Search = () => {
    return (
        <>
            <input
                type="text"
                className="p-2 pl-8 w-full rounded border border-indigo-900 focus:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                placeholder="Buscar proyecto..."
            />
            <svg className="w-4 h-4 absolute left-2.5 top-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </>
    )
}
