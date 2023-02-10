import React, {useContext} from "react"
import TaskContext from "../context/TasksProvider"

export const useTasks = () => {
    return useContext(TaskContext)
}