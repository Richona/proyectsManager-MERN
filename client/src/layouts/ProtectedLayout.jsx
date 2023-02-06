import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedLayout = () => {
    const { auth, loading } = useAuth()

    {
        if (loading) {
            return (
                <div
                    className="animate-spin inline-block w-10 h-10 mt-52 border-[3px] border-current border-t-transparent text-purple-600 rounded-full"
                    role="status"
                    aria-label="loading"
                >
                    <span className="sr-only">Loading...</span>
                </div>
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
