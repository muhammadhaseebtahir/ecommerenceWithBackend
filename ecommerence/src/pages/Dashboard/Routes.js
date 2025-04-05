import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddProducts from './AddProduct'
import ShowProducts from './ShowProducts'

export default function Index() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/add-product' element={<AddProducts />} />
      <Route path='/show-products' element={<ShowProducts />} />
    </Routes>
  )
}
