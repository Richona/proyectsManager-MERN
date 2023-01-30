import React from 'react';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { Root } from '../pages/Root';
import {Home} from '../pages/Home'
import { Register } from '../pages/Register';
import { Login } from '../pages/Login'
import { ForgetPassword } from '../pages/ForgetPassword';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
          {/* HOME */}
          <Route path='/' exact={true} element={<Home/>}/>

          {/* USERS */}
          <Route path='/registro' exact={true} element={<Register/>}/>
          <Route path='/ingresar' exact={true} element={<Login/>}/>
          <Route path='/contraseña-olvidada' exact={true} element={<ForgetPassword/>}/>
        </Route>
    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}
