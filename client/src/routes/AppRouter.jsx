import React from 'react';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import { Root } from '../pages/Root';
import {Home} from '../pages/Home'
import { Register } from '../pages/Register';
import { Login } from '../pages/Login'
import { ForgetPassword } from '../pages/ForgetPassword';
import { RecoverPassword } from '../pages/RecoverPassword';
import { ConfirmAccount } from '../pages/ConfirmAccount';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
          {/* HOME */}
          <Route path='/' exact={true} element={<Home/>}/>

          {/* USERS */}
          <Route path='/register' exact={true} element={<Register/>}/>
          <Route path='/login' exact={true} element={<Login/>}/>
          <Route path='/forget-password' exact={true} element={<ForgetPassword/>}/>
          <Route path='/recover-password/:token' exact={true} element={<RecoverPassword/>}/>
          <Route path='/confirm/:token' exact={true} element={<ConfirmAccount/>}/>
        </Route>
    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}
