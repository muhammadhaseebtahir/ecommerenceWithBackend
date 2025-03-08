import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Header from '../../components/Header'

export default function index() {
  return (

    <>
    <Header/>

<main>
    

    <Routes>
      <Route index element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
    </Routes>

</main>

    </>
  )
}
