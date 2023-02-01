import React from 'react'
import {Outlet} from 'react-router-dom'
import { Footer } from '../components/root/Footer'
import { TopBar } from '../components/root/TopBar'

export const Root = () => {
    return (
    <div className="w-full bg-neutral-800">
        <div id="content-wrapper" className="d-flex flex-column w-full" style={{display: "flex", flexDirection: "column", minHeight: "100vh", width: "100%"}}>
            <div style={{flex: "2"}}>

                <TopBar />

                <Outlet/>
            </div>

            <Footer/>
        </div>
    </div>
    )
}
