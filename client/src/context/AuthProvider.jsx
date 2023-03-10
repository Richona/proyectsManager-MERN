import React, { createContext, useEffect, useState } from 'react'
import { clientAxios } from '../config/clientAxios';

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    const [showMenuUser, setShowMenuUser] = useState(true);

    useEffect(() => {
        const authUser = async () => {
            const token = sessionStorage.getItem("token")
            if(!token){
                setLoading(false)
                return null
            }

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                }
            }

            try {
                const {data} = await clientAxios.get("/users/profile", config)
                
                setAuth(data.user)
            } catch (error) {
                console.error(error.response?.data)
                sessionStorage.removeItem("token")
            }finally{
                setLoading(false)
            }
        }

        authUser()
    }, []);

    const handleShowMenuUser = () => {
        setShowMenuUser(!showMenuUser)
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                showMenuUser,
                handleShowMenuUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext