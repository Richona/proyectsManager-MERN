import React from 'react'
import { Link } from 'react-router-dom'
import { LogoHeader } from '../../../assets/LogoHeader'

export const Logo = () => {
    return (
        <div className="flex flex-shrink-0 items-center">
            <Link to={"/"}>
                <LogoHeader />
            </Link>
        </div>
    )
}
