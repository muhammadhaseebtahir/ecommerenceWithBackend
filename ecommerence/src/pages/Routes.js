import React from 'react'
import { Navigate, Routes, Route,  } from 'react-router-dom';
import Frontend from './Frontend';
import Auth from './Auth';
import { useAuthContext } from '../context/AuthContext';
export default function Index() {
  const {isAuthenticated}=useAuthContext()
  return (
    <Routes>
      <Route path='/*' element={<Frontend/>} />
      <Route path='auth/*' element={!isAuthenticated ? <Auth/> :<Navigate to="/"/>} />
    </Routes>
  )
}
