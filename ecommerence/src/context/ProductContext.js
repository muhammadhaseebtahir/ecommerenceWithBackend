import React, { createContext, useContext, useEffect, useState  } from 'react';
import axios from 'axios';


const ProductsContext = createContext()

export default function ProductContext({children}) {
   const [products, setProducts] = useState([])

   const fetchProducts=async()=>{
     try{
      const res=  await axios.get("https://ecommerence-backend-9kv6.vercel.app/dashboard/getproducts")
        setProducts(res.data.products)
        // console.log("products", res.data.products)
    }
    catch(err){
        console.log("error", err.message)
    
   }
  }
   
    useEffect(()=>{
        fetchProducts()
    },[])

  return (
    <ProductsContext.Provider value={{products,setProducts,fetchProducts}}>
      {children}
    </ProductsContext.Provider>
  )
}


export const  useProductContext = ()=>useContext(ProductsContext)


