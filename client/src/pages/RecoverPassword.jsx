import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Alert } from '../components/Alert';
import { clientAxios } from '../config/clientAxios';

export const RecoverPassword = () => {
  const [alert, setAlert] = useState({});
  const [password, setPassword] = useState("");
  const [tokenChecked, setTokenChecked] = useState(false);
  const [sending, setSending] = useState(false);
  const [eyePassword, setEyePassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleShowAlert = (msg) => {
    setAlert({ msg })
    setTimeout(() => {
      setAlert({})
    }, 3000);
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await clientAxios.get(`/auth/reset-password?token=${token}`)
        setTokenChecked(true)

      } catch (error) {
        console.error(error)
        handleShowAlert(error.response?.data.msg)
      }
    }

    checkToken()

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password) {
      handleShowAlert("La contraseña es requerida")
      return null
    }

    try {
      setSending(true)
      const { data } = await clientAxios.post(`/auth/reset-password?token=${token}`, {
        password
      })
      setSending(false)

      Swal.fire({
        icon: "info",
        title: "Contraseña reseteada!",
        text: data.msg,
        confirmButtonText: "Inicia sesion",
        allowOutsideClick: false
      }).then(result => {
        if (result.isConfirmed) {
          setPassword("")
          navigate("/login")
        }
      })

    } catch (error) {
      console.error(error)
      handleShowAlert(error.response?.data.msg)
      setPassword("")
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <section className=' bg-gray-800 w-5/6 rounded py-8 px-8 lg:w-4/6 shadow-lg border border-indigo-900'>
        <h1 className='text-xl lg:text-3xl'>Reestablecé tu contraseña</h1>
        {
          alert.msg && <Alert {...alert} />
        }
        {
          tokenChecked ?
            (
              <form
                onSubmit={handleSubmit}
                noValidate
              >
                <div className='flex flex-wrap justify-center w-6/6 mt-5 '>
                  <label
                    className='w-full'
                    htmlFor="password"
                  >
                    Nueva contraseña
                  </label>
                  <div className='w-full relative'>
                    <input
                      className='w-full rounded-sm pl-3 py-2 mt-1'
                      id="password"
                      type={eyePassword ? "text" : "password"}
                      placeholder="Escribí tu nueva contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                      class={`fa-regular ${eyePassword ? "fa-eye" : "fa-eye-slash"} absolute right-2.5 top-4`}
                      onClick={() => setEyePassword(!eyePassword)}
                    />
                  </div>

                </div >
                <button
                  type="submit"
                  className='mt-5 border-gray-500 disabled:bg-neutral-700'
                  disabled={sending}
                >
                  Resetear contraseña
                </button>
              </form>
            ) :
            (
              <nav className='flex justify-between mt-5 md:mx-12'>
                <Link to={'/register'} className="text-xs">¿No tenés una cuenta? Registrate</Link>
                <Link to={'/login'} className="text-xs">¿Estás registrado? Iniciá sesión</Link>
              </nav>
            )
        }

      </section>
    </div>
  )
}
