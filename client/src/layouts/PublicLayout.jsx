import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicLayout = () => {
    const sessionUser = sessionStorage.getItem("token")

    return (
        <>
            {
                !sessionUser ? (
                    <Outlet />
                ) : (
                    <Navigate to="/projects" />
                )
            }
        </>
    )
}
