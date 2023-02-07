import React, { createContext, useState } from 'react'
import { clientAxios } from '../config/clientAxios';
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

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {

  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

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

  const getProjects = async () => {
    setLoading(true)
    try {
      const token = sessionStorage.getItem("token")
      if (!token) return null

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token
        }
      }

      const { data } = await clientAxios.get(`/projects`, config)
      setProjects(data.projects)

    } catch (error) {
      console.error(error)
      showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
    } finally {
      setLoading(false)
    }
  }

  const getProject = async (id) => {
    setLoading(true)

    try {
      const token = sessionStorage.getItem("token")
      if (!token) return null

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token
        }
      }

      const { data } = await clientAxios.get(`/projects/${id}`, config)
      setProject(data.project)

    } catch (error) {
      console.error(error)
      showAlert(error.response ? error.response.data.msg : "Ups, hubo un error", false)
    } finally {
      setLoading(false)
    }
  }

  const storeProject = async (project) => {
    try {
      const token = sessionStorage.getItem("token")
      if (!token) return null

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: token
        }
      }

      const { data } = await clientAxios.post(`/projects`, project, config)
      setProjects([...projects, data.project])

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
    <ProjectsContext.Provider
      value={{
        loading,
        alert,
        showAlert,
        projects,
        getProjects,
        project,
        getProject,
        storeProject
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export {
  ProjectsProvider
}

export default ProjectsContext;