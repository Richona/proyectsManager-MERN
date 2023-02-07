import React, { createContext, useState } from 'react'
import { clientAxios } from '../config/clientAxios';
import useAuth from '../hooks/useAuth';
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const UserContext = createContext()

const UsersProvider = ({ children }) => {
    const { auth, setAuth } = useAuth()
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState({});

    const showAlert = (msg, time = true) => {
        setAlert({
            msg
        });
        if (time) {
            setTimeout(() => {
                setAlert({})
            }, 3000);
        }
    }

    const updatedUser = async (userUpdated) => {
        try {
            const token = sessionStorage.getItem("token")
            if (!token) return null

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.post(`/users/profile/${auth._id}`, userUpdated, config)
           
            setUser({
                _id: data.user._id,
                name: data.user.name, 
                email: data.user.email
            })

            Toast.fire({
                icon: "success",
                title: data.msg
            })

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
        }
    }

    console.log(user)
    return (
        <UserContext.Provider
            value={{
                loading,
                alert,
                showAlert,
                auth,
                setAuth,
                updatedUser,
                user
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export {
    UsersProvider
}

export default UserContext
