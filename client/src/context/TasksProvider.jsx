import React, { createContext, useState } from 'react'
import { clientAxios } from '../config/clientAxios';

const TaskContext = createContext()

const TasksProvider = ({ children }) => {

    const [alert, setAlert] = useState({});
    const [loadingTask, setLoadingTask] = useState(true);

    const [tasks, setTasks] = useState([]);

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

    const getTasks = async (id) => {
        setLoadingTask(true)
        try {
            const token = sessionStorage.getItem("token")
            if (!token) return null

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                },
                params:{
                    project: id
                }
            }

            const { data } = await clientAxios.get(`/tasks`, config)
            setTasks(data.tasks)

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
        } finally {
            setLoadingTask(false)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                alert,
                showAlert,
                loadingTask,
                tasks,
                getTasks
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export {
    TasksProvider
}

export default TaskContext