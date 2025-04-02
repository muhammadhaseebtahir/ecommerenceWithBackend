import React from 'react'

import {UserOutlined} from '@ant-design/icons'
import { useAuthContext } from '../../../context/AuthContext'


export default function Home() {
  const {user} = useAuthContext()

  return (
    <div className="container-fluid  bg-light min-vh-100">
         <div className="adminContentBox border-bottom">
                <h2 className='text-center   mt-3 '>Welcome to  {user.userName}</h2>
            <div className="adminContentBoxHeader py-5 ">
             <div className="adminData d-flex  align-items-center flex-wrap">
              <div className="leftSide ps-1 ps-md-5  ">
                    <p className='  p-3 rounded-circle border  px-4' style={{fontSize:"7vw",background:"#ffffff"}}> <UserOutlined/></p>
              </div>
              <div className="rightSide ps-1 ps-md-5">
            <h1>{user.userName}</h1>
            <h3>{user.email}</h3>
            <h5>Admin Dashboard</h5>
                <p>Manage your store effectively.</p>
              </div>
             </div>

            </div>
            <div className="adminContentBoxBody">
                
            </div>
            
          </div>
            
            <div className="SalesAboutDetails">
                 <div className="  AboutProductsAndUser mt-5 d-flex justify-content-between flex-column flex-lg-row  flex-wrap gap-5">
                    <div className="card p-3 shadow " style={{flex:"20%",border:"none"}}>
                      <div className="d-flex justify-content-between">
                      <div className="leftSide">
                       <p className='mb-0'>Total Revenue</p>
                       <p style={{color:"#adb5bd"}}>Last 30 days</p>
                       <h3>$82.38</h3>
                      </div>
                      <div className="rightSide  " >
                      <i className="ri-hand-heart-line fs-3 rounded-circle p-2" style={{background:"#f8f9fa",color:"#94d2bd"}}></i>
                      <p className='mt-4'><i className="ri-route-line"></i> <span style={{color:"#94d2bd"}}> 17%</span></p>
                     
                      </div>
                      
                      </div>


                    </div>
                    <div className="card p-3 shadow" style={{flex:"20%",border:"none"}}>
                      <div className="d-flex justify-content-between">
                      <div className="leftSide">
                       <p className='mb-0'>Total Order</p>
                       <p style={{color:"#adb5bd"}}>Last 30 days</p>
                       <h3>$82.38</h3>
                      </div>
                      <div className="rightSide  " >
                      <i className="ri-shopping-cart-2-line fs-3 rounded-circle p-2" style={{background:"#f8f9fa",color:"#94d2bd"}}></i>
                      <p className='mt-4'><i className="ri-route-line"></i> <span style={{color:"#94d2bd"}}> 17%</span></p>
                     
                      </div>
                      
                      </div>


                    </div>
                    <div className="card p-3 shadow" style={{flex:"20%",border:"none"}}>
                      <div className="d-flex justify-content-between">
                      <div className="leftSide">
                       <p className='mb-0'>Total Customer</p>
                       <p style={{color:"#adb5bd"}}>Last 30 days</p>
                       <h3>$82.38</h3>
                      </div>
                      <div className="rightSide  " >
                      <i className="ri-user-line fs-3 rounded-circle p-2" style={{background:"#f8f9fa",color:"#94d2bd"}}></i>
                      <p className='mt-4'><i className="ri-route-line"></i> <span style={{color:"#94d2bd"}}> 17%</span></p>
                      
                      </div>
                      
                      </div>


                    </div>
                    <div className="card p-3 shadow " style={{flex:"20%",border:"none"}}>
                      <div className="d-flex justify-content-between">
                      <div className="leftSide">
                       <p className='mb-0'>Pending Delivery</p>
                       <p style={{color:"#adb5bd"}}>Last 30 days</p>
                       <h3>$82.38</h3>
                      </div>
                      <div className="rightSide  " >
                      <i className="ri-truck-line fs-3 rounded-circle p-2" style={{background:"#f8f9fa",color:"#94d2bd"}}></i>
                      <p className='mt-4'><i className="ri-route-line"></i> <span style={{color:"red"}}> 17%</span></p>
                      </div>
                      
                      </div>


                    </div>
                   

                 </div>

            </div>




    </div>
  )
}
