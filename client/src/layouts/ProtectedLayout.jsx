import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const {auth, loading} = useAuth()

    {
       if(loading){
        return <p>Cargando...</p>
       }  
    }
    
    return (
        <>
        {
            auth._id ? (
                <Outlet/>
            ):
            (
                <Navigate to="/login" />
            )
        }
        </>
    )
    
}
