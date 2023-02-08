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

    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(true);

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

    const handleShowModal = () => {
        setShowModal(!showModal)
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

            if (task.id) {
                const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config)

                const tasksUpdated = tasks.map(taskState => {
                    if (taskState._id === data.taskUpdated._id) {
                        return data.project
                    }
                    return taskState
                })

                setTasks(tasksUpdated)

                Toast.fire({
                    icon: "success",
                    title: data.msg
                })

            } else {
                const { data } = await clientAxios.post(`/tasks`, task, config)
                setTasks([...tasks, data.taskStore])

                Toast.fire({
                    icon: "success",
                    title: data.msg
                })
            }

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
                showModal,
                handleShowModal,
                tasks,
                getTasks,
                storeTask,
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