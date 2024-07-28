import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function AdminHome() {
  return (
    <>
      {/* <Link to = "/admin/login">Admin Login</Link> */}
      <Link to = "/admin/updatemenu">Menu</Link>
      <Link to = "/admin/vieworders">Orders</Link>
      <Link to = "/admin/dashboard">Dashboard</Link>
      <Outlet />
    </>
    
  )
}

export default AdminHome
