import React from 'react'
import { Navigate, Routes, Route,  } from 'react-router-dom';
import Frontend from './Frontend';
import Dashboard from './Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Auth from './Auth';
import { useAuthContext } from '../context/AuthContext';
export default function Index() {
  const {isAuthenticated,isAdmin}=useAuthContext()
  
  
  return (
    <Routes>
      <Route path='/*' element={<Frontend/>} />
      <Route path='auth/*' element={!isAuthenticated ? <Auth/> :<Navigate to="/"/>} />
      <Route path="dashboard/*" element={ isAuthenticated && isAdmin?   <PrivateRoute Component={Dashboard} /> : <Navigate to="/ " /> }/>
      
    </Routes>
  )
}
