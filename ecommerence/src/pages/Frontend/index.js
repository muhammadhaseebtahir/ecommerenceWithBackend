import React from 'react'
import {  Routes, Route } from 'react-router-dom'
import Home from './Home'

import Contact from './Contact'
import ProductDetails from './ProductDetails'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Order from './Order'

export default function index() {
  return (

    <>
    <Header/>

<main>
    

    <Routes>
      <Route index element={<Home/>} />
      <Route path='/order' element={<Order/>} />
      
      <Route path='/contact' element={<Contact/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/shop/product/:id' element={<ProductDetails/>} />

    </Routes>

</main>
<Footer/>
    </>
  )
}
