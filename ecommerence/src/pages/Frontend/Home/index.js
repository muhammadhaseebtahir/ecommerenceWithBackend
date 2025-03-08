import React from 'react'
import { useAuthContext } from '../../../context/AuthContext'

export default function Home() {


  const {isAuthenticated,user,isAdmin}=useAuthContext()
  console.log("user",user)
  console.log("isAuthenticated",isAuthenticated)
  console.log("isAdmin",isAdmin)
  return (
    <>
      <h1>Home</h1>
    </>
  )
}
