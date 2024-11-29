import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../user/Navbar'
const Layout = () => {
  return (
    <div className='relative'>
       <Navbar/>
       <Outlet />
    </div>
  )
}

export default Layout