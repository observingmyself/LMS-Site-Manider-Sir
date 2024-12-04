import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../user/Navbar'
import Footer from '../user/Footer'
const Layout = () => {
  return (
    <div className='relative'>
       <Navbar/>
       <Outlet />
       <Footer/>
    </div>
  )
}

export default Layout