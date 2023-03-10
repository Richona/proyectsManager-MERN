import React, { createContext, useState } from 'react'
import Swal from 'sweetalert2';
import { clientAxios } from '../config/clientAxios';

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

const TaskContext = createContext()

const TasksProvider = ({ children }) => {

    const [alert, setAlert] = useState({});
    const [loadingTask, setLoadingTask] = useState(true);
    const [sendingTask, setSendingTask] = useState(false);
    const [showModal, setShowModal] = useState({ state: true, method: "", task: "" });

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    
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

    const handleShowModal = ({ state, method, task }) => {
        setShowModal({ state, method, task })
    }

    const getTask = async (id) => {

        try {
            const token = sessionStorage.getItem("token")
            if (!token) return null

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.get(`/tasks/${id}`, config)
            setTask(data.task)

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
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
                params: {
                    project: id
                }
            }

            const { data } = await clientAxios.get(`/tasks`, config)
            data.tasks.sort(function (a, b) { return a.state - b.state });

            setTasks(data.tasks)

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
        } finally {
            setLoadingTask(false)
        }
    }

    const storeTask = async (task) => {
        try {
            const token = sessionStorage.getItem("token")
            if (!token) return null

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                }
            }

            setSendingTask(true)
            if (task.method === "EDITAR") {
                const { data } = await clientAxios.put(`/tasks/${task.idTask}`, task, config)

                const tasksUpdated = tasks.map(taskState => {
                    if (taskState._id === data.taskUpdated._id) {
                        return data.taskUpdated
                    }
                    return taskState
                })

                tasksUpdated.sort(function (a, b) { return a.state - b.state });

                setTasks(tasksUpdated)

                Toast.fire({
                    icon: "success",
                    title: data.msg
                })

            } else {
                const { data } = await clientAxios.post(`/tasks`, task, config)

                const tasksOrder = [...tasks, data.taskStore]

                tasksOrder.sort(function (a, b) { return a.state - b.state });

                setTasks(tasksOrder)

                Toast.fire({
                    icon: "success",
                    title: data.msg
                })
            }
        
            setTimeout(() => {
                setSendingTask(false)
                handleShowModal({ state: !showModal.state, method: "" })
            }, 3000);

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error")
        }
    }

    const stateTask = async (id) => {
        try {
            const token = sessionStorage.getItem("token")
            if (!token) return null

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.get(`/tasks/change-state/${id}`, config)

            const tasksUpdated = tasks.map(taskState => {
                if (taskState._id === data.task._id) {
                    return data.task
                }
                return taskState
            })

            tasksUpdated.sort(function (a, b) { return a.state - b.state });

            setTasks(tasksUpdated)

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
        }
    }

    const deleteTask = async (id) => {
        try {
            const token = sessionStorage.getItem("token")
            if (!token) return null

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                }
            }

            const { data } = await clientAxios.delete(`/tasks/${id}`, config)

            const tasksFiltered = tasks.filter(task => task._id !== id)

            tasksFiltered.sort(function (a, b) { return a.state - b.state });

            setTasks(tasksFiltered)

            Toast.fire({
                icon: "success",
                title: data.msg
            })

        } catch (error) {
            console.error(error)
            showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                alert,
                showAlert,
                loadingTask,
                sendingTask,
                showModal,
                handleShowModal,
                task,
                getTask,
                tasks,
                getTasks,
                setTasks,
                storeTask,
                stateTask,
                deleteTask
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