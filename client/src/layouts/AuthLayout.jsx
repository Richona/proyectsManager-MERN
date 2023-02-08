import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/root/Footer'
import { TopBar } from '../components/root/TopBar'
import useAuth from '../hooks/useAuth'

export const AuthLayout = () => {
    const {showMenuUser, handleShowMenuUser } = useAuth()

    return (
        <div className="w-full" onClick={() => {showMenuUser === false && handleShowMenuUser(true)}}>
            <div 
                id="content-wrapper" 
                className="d-flex flex-column w-full" 
                style={{ display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%" }}
                
            >
                <div className='mb-10' style={{ flex: "2" }}>
                    <TopBar />

                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    )
}
