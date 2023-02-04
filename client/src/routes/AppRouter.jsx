import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';

/* Layouts */
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedLayout } from '../layouts/ProtectedLayout';

/* Pages Publics*/
import { Home } from '../pages/Home'
import { Register } from '../pages/Register';
import { Login } from '../pages/Login'
import { ForgetPassword } from '../pages/ForgetPassword';
import { RecoverPassword } from '../pages/RecoverPassword';
import { ConfirmAccount } from '../pages/ConfirmAccount';

/* Pages Privates */
import { Projects } from '../pages/Projects';
import { ProjectAdd } from '../pages/ProjectAdd';
import { ProjectEdit } from '../pages/ProjectEdit';
import { Project } from '../pages/Project';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<AuthLayout />}>
        {/* ROUTES PUBLICS */}
        <Route path='/' exact={true} element={<Home />} />
        <Route path='/register' exact={true} element={<Register />} />
        <Route path='/login' exact={true} element={<Login />} />
        <Route path='/forget-password' exact={true} element={<ForgetPassword />} />
        <Route path='/recover-password/:token' exact={true} element={<RecoverPassword />} />
        <Route path='/confirm/:token' exact={true} element={<ConfirmAccount />} />

        {/* ROUTES PRIVATES */}
        <Route element={<ProtectedLayout />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/create-project" element={<ProjectAdd />} /> 
          <Route path="/projects/edit-project/:id" element={<ProjectEdit />} /> 
          <Route path="/projects/:id" element={<Project/>}/> 
        </Route>
        
      </Route>
  )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}
