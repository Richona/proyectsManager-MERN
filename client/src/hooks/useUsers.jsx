import {useContext} from "react"
import UserContext from "../context/UsersProvider"

const useUsers = () => {
    return useContext(UserContext)
}

export default useUsers