import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import useAuth from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { auth, loading } = useAuth()

    {
        if (loading) {
            return (
                <Spinner/>
            )
        }
    }

    return (
        <>
            {
                auth._id ? (
                    <Outlet />
                ) : (
                    <Navigate to="/login" />
                )
            }
        </>
    )

}
